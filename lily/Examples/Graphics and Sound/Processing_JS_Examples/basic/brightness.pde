
int barWidth = 5;
int[] brightness;

void setup() 
{
  size(200, 200);
  colorMode(HSB, 360, height, height);  
  brightness = new int[width/barWidth];
}

void draw() 
{
  int j = 0;
  for (int i = 0; i <= (width-barWidth); i += barWidth) {  
    noStroke();
    if ((mouseX > i) && (mouseX < i+barWidth)) {
      brightness[j] = mouseY;
    }
    fill(i, height, brightness[j]);
    rect(i, 0, barWidth, height);  
    j++;
  }
}
