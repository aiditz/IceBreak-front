for f in *.svg; do 
  inkscape -z -e $f.32x32.png -w 32 -h 32 $f
done


