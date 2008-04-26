/** 

Copyright (c) 2007 Bill Orcutt (http://lilyapp.org, http://publicbeta.cx)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 

*/

/**
*	Construct a new socket object
*	@class
*	@constructor
*	@extends LilyObjectBase
*/
function $socket(param)
{
	var thisPtr=this;	
	var args=param||"127.0.0.1 9001";
	
	var gHost = args.split(" ")[0];
	var gPort = parseInt(args.split(" ")[1]);
	var gConnected = false;
	
	var gOutstream = null;
	var gInstream = null;
	var gTransport = null;
	
	this.outlet1 = new this.outletClass("outlet1",this,"message read from socket");
	this.inlet1=new this.inletClass("inlet1",this,"message to write to socket");	
		
	//send a message
	this.inlet1["anything"]=function(mess) {
		if(!gConnected) {
			initSocket(gHost,gPort);
		}			
		gOutstream.write(mess,mess.length);
	}
	
	//connect
	this.inlet1["doConnect"]=function() {	
		if(!gConnected) {
			initSocket(gHost,gPort);
		}	
	}	
	
	//clean up
	this.destructor=function() {
		if(gInstream) gInstream.close();
		if(gOutstream) gOutstream.close();
		gTransport=null;
	}
	
	//listener for a response
    var dataListener = {
      onStartRequest: function(request, context){},
      onStopRequest: function(request, context, status) {},
      onDataAvailable: function(request, context, inputStream, offset, count) {
		thisPtr.outlet1.doOutlet(gInstream.read(count));
      }
    }		
	
	//create a socket & listener
	function initSocket(host,port)
	{
	  try {
	    var transportService =
	      Components.classes["@mozilla.org/network/socket-transport-service;1"]
	        .getService(Components.interfaces.nsISocketTransportService);
	
	    gTransport = transportService.createTransport(null,0,host,port,null);

	    gOutstream = gTransport.openOutputStream(0,0,0);

	    var stream = gTransport.openInputStream(0,0,0);
	    gInstream = Components.classes["@mozilla.org/scriptableinputstream;1"]
	      .createInstance(Components.interfaces.nsIScriptableInputStream);
	    gInstream.init(stream);

	    var pump = Components.
	      classes["@mozilla.org/network/input-stream-pump;1"].
	        createInstance(Components.interfaces.nsIInputStreamPump);
	    pump.init(stream, -1, -1, 0, 0, false);
	    pump.asyncRead(dataListener,null);
		
		gConnected=true;
	
	  } catch (ex) {
			LilyDebugWindow.error("couldn't create a socket")
			return null;
	  }
	  return null;
	}

	return this;
}

var $socketMetaData = {
	textName:"socket",
	htmlName:"socket",
	objectCategory:"Network",
	objectSummary:"Network Socket.",
	objectArguments:"host [127.0.0.1], port [9001]"
}