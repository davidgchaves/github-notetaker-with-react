Github NoteTaker with React
===========================

### Install `npm` dependencies

```
$ npm install
```

### Building with `webpack`

```
$ webpack
```

or in case 'watching' the files is your cup of tea

```
$ webpack -w
```

### Aliasing `webpack` command
In order to easily use the locally installed (node_modules/...) `webpack`
command, add the following line to your `~/.zshrc`:

```
alias webpack='./node_modules/webpack/bin/webpack.js'
```

This step is not necessary to run the `webpack` command.
You can always globally install it:

```
$ node install -g webpack
```

or explicitly use the locally installed version:

```
$ ./node_modules/webpack/bin/webpack.js
```

but IMHO, aliasing the `webpack` command is the best choice.
