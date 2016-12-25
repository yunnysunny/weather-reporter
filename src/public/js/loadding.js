var cSpeed=9;
var cWidth=64;
var cHeight=64;
var cTotalFrames=24;
var cFrameWidth=64;
var cImageSrc='images/sprites.gif';

var cImageTimeout=false;
var cAnimationTimeout = false;
var cIndex=0;
var cXpos=0;
var SECONDS_BETWEEN_FRAMES=0;

function startAnimation(){
	
	document.getElementById('loaderImage').style.backgroundImage='url('+cImageSrc+')';
	document.getElementById('loaderImage').style.width=cWidth+'px';
	document.getElementById('loaderImage').style.height=cHeight+'px';
	
	//FPS = Math.round(100/(maxSpeed+2-speed));
	FPS = Math.round(100/cSpeed);
	SECONDS_BETWEEN_FRAMES = 1 / FPS;
	
	cAnimationTimeout = setTimeout('continueAnimation()', SECONDS_BETWEEN_FRAMES/1000);
	
}

function continueAnimation(){
	
	cXpos += cFrameWidth;
	//increase the index so we know which frame of our animation we are currently on
	cIndex += 1;
	 
	//if our cIndex is higher than our total number of frames, we're at the end and should restart
	if (cIndex >= cTotalFrames) {
		cXpos =0;
		cIndex=0;
	}
	
	document.getElementById('loaderImage').style.backgroundPosition=(-cXpos)+'px 0';
	
	cAnimationTimeout = setTimeout('continueAnimation()', SECONDS_BETWEEN_FRAMES*1000);
}

function imageLoader(s, fun)//Pre-loads the sprites image
{
	clearTimeout(cImageTimeout);
	cImageTimeout=0;
	genImage = new Image();
	genImage.onload=function (){cImageTimeout=setTimeout(fun, 0)};
	genImage.onerror=new Function('alert(\'Could not load the image\')');
	genImage.src=s;
}

function stopAnimation() {
	clearTimeout(cAnimationTimeout);
	document.getElementById('loaderImage').style.display = 'none';
}

//The following code starts the animation
new imageLoader(cImageSrc, 'startAnimation()');