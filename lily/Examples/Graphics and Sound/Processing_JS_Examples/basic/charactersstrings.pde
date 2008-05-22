
PImage frog;
PFont fontA;
int lettersize = 90;
int xoffset;
char letter;

void setup() 
{
  size(200, 200);
  fontA = loadFont("Arial"); 
  textFont(fontA); 
  textSize(lettersize);
    
  // The String datatype must be capitalized because it is a complex datatype.
  // A String is actually a class with its own methods, some of which are
  // featured below.
  String name= "rathausFrog";
  String extension = ".jpg";
  int nameLength = name.length();
  println("The length of " + name + " is " + nameLength + ".");
  name = name.concat(extension);
  nameLength = name.length();
  println("The length of " + name + " is " + nameLength + ".");

  // The parameter for the loadImage() method must be a string
  // This line could also be written "frog = loadImage("basic/data/rathausFrog.jpg");
  frog = loadImage("basic/data/"+name);
}

void draw() 
{
  background(51); // Set background to dark gray
  
  image(frog, xoffset, 0);
  
  // Draw an X
  line(0, 0, width, height);  
  line(0, height, width, 0); 
  
  // Get the width of the letter
  int letterWidth = int(fontA.width(letter) * lettersize);
      
  // Draw the letter to the center of the screen
  text(letter, width/2-letterWidth/2, height/2);
}

void keyPressed()
{
  // The variable "key" always contains the value of the most recent key pressed.
  // If the key is an upper or lowercase letter between 'A' and 'z'
  // the image is shifted to the corresponding value of that key
  if(key >= 'A' && key <= 'z') {
    letter = char(key);
    // Scale the values to numbers between 0 and 100
    float scale = 100.0/57.0;
    int temp = int((key - 'A') * scale);
    // Set the offset for the image
    xoffset = temp;
    println(key);
  }
}
