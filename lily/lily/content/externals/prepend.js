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
*	Construct a new prepend object
*	@class
*	@constructor
*	@extends LilyObjectBase
*/
function $prepend(str)
{
	var thisPtr=this;
	var prependStr=(str+"")||"";
	
	this.outlet1 = new this.outletClass("outlet1",this,"prepended string");
	this.inlet1=new this.inletClass("inlet1",this,"string to prepend to");
	this.inlet2=new this.inletClass("inlet2",this,"string to prepend");	
	
	this.inlet1["anything"]=function(msg) {
		if(LilyUtils.typeOf(msg)=="array")
			var newStr=prependStr+" "+msg.join(" ");
		else
			var newStr=prependStr+" "+msg;			
		
		thisPtr.outlet1.doOutlet(newStr);
	}
	
	this.inlet2["anything"]=function(msg) {
		prependStr=(msg+"");
	}			
	
	return this;
}

var $prependMetaData = {
	textName:"prepend",
	htmlName:"prepend",
	objectCategory:"Messages",
	objectSummary:"Prepend text to a message.",
	objectArguments:"string to prepend"
}