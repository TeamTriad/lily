
float a = 100;

void setup() 
{
  size(200, 200);
  stroke(255);
  frameRate(30);
}

void draw() 
{
  background(51);
  a = a - 1;
  if (a < 0) { 
    a = height; 
  }
  line(0, a, width, a);  
}
