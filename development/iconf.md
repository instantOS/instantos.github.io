# instantCONF

instantCONF provides the cli tool iconf which acts as a really simple sqlite
based key value store. 


## Usage

Get the value of a setting option  
Prints the value to stdout. 
Exits with exit code 1 if the option is not set
```
iconf optionname
```

Set an option


```
iconf optionname value
```

### binary values

Get a binary value. doesn't print to stdout and instead exits with exit code 0 if option is true and 1 if the option is set to false. 
Defaults to false (exit status 1)
```
iconf -i optionname
```

set a binary option. 
```
iconf -i optionname 0/1
```

### Default values

```
iconf optionname:defaultvalue

# example

$ iconf doesnotexist:helloworld
helloworld

```

this gives the value of optionname if it is set, otherwise this will output 'defaultvalue'
