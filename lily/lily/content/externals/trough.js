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
*	Construct a new trough object
*	@class
*	@constructor
*	@extends LilyObjectBase
*/

function $trough(arg) 
{
	var thisPtr=this;
	var previousMsg=Number(arg)||null;
	this.inlet1=new this.inletClass("inlet1",this,"number to test.");
	this.inlet2=new this.inletClass("inlet2",this,"number sets new minimum");	
	this.outlet1=new this.outletClass("outlet1",this,"numbers smaller than their predecessors");
	
	this.inlet1["anything"]=function(msg) {
		if(!previousMsg||previousMsg>(+msg)) {
			thisPtr.outlet1.doOutlet((+msg));
			previousMsg=(+msg);			
		}	
	}
	
	this.inlet2["anything"]=function(msg) {			
		previousMsg=(+msg);
	}
	
	return this;
}

var $troughMetaData = {
	textName:"trough",
	htmlName:"trough",
	objectCategory:"Control",
	objectSummary:"Output the lowest number in a series.",
	objectArguments:"initial value"
}