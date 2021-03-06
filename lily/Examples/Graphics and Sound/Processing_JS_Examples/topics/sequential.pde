
int numFrames = 12;  // The number of frames in the animation
int frame = 0;
PImage[] images = new PImage[numFrames];
    
void setup()
{
  size(200, 200);
  frameRate(30);
  
  images[0]  = loadImage("topics/data/PT_anim0000.gif");
  images[1]  = loadImage("topics/data/PT_anim0001.gif"); 
  images[2]  = loadImage("topics/data/PT_anim0002.gif");
  images[3]  = loadImage("topics/data/PT_anim0003.gif"); 
  images[4]  = loadImage("topics/data/PT_anim0004.gif");
  images[5]  = loadImage("topics/data/PT_anim0005.gif"); 
  images[6]  = loadImage("topics/data/PT_anim0006.gif");
  images[7]  = loadImage("topics/data/PT_anim0007.gif"); 
  images[8]  = loadImage("topics/data/PT_anim0008.gif");
  images[9]  = loadImage("topics/data/PT_anim0009.gif"); 
  images[10] = loadImage("topics/data/PT_anim0010.gif");
  images[11] = loadImage("topics/data/PT_anim0011.gif"); 
  
  // If you don't want to load each image separately
  // and you know how many frames you have, you
  // can create the filenames as the program runs.
  // The nf() command does number formatting, which will
  // ensure that the number is (in this case) 4 digits.
  //for(int i=0; i<numFrames; i++) {
  //  String imageName = "PT_anim" + nf(i, 4) + ".gif";
  //  images[i] = loadImage(imageName);
  //}
} 
 
void draw() 
{ 
  frame = (frame+1)%numFrames;  // Use % to cycle through frames
  image(images[frame], 0, 0);
}
