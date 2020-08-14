# Customizing instantWM

instantWM is customized through ~/. Xresources

The syntax for changing a parameter value is the following

``` 
instantwm.parameter: value
```

After editing ~/. Xresources, run xrdb ~/. Xresources and then restart instantWM

## Bar height

### Example

``` 
instantwm.barheight: 2
```

This parameter sets the amount extra rows of pixels that get added to the top and bottom of the title bar. 
Putting 0 here would mean the text would touch the bars boundaries. 

Example of a top bar with the height 2

![2px](https://instantos.io/images/topbar/2px.png)

Example of a top bar with the height 24

![24px](https://instantos.io/images/topbar/24px.png)

## Fonts

This is the default font.

``` 
instantwm.font: Cantarell-Regular:size=12
```

To change font size, simply change the number at the end. 

``` 
instantwm.font: Cantarell-Regular:size=22
```

You can change this to any font you like with any size, granted that you put in the right font name. 

## Colors

This feature is implemented, the documentation is not yet. 
