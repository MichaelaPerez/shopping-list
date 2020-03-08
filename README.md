# Shopping List

I built this desktop app for practice. It's my first Electron app, and it's based on the [this tutorial](https://www.youtube.com/watch?v=kN1Czs0m1SU).

## Getting Started

Download all the files here and save them to a folder you are comfortable with.

### Prerequisites and Installing

I used Visual Studio to write and edit all my code. Visit [their website](https://visualstudio.microsoft.com/) for installation 
instructions if you don't have it yet.

When you open up the project folder in Visual Studio, open up the terminal within the application. I think you may have to enter the 
following command to ensure you have Electron installed:

```
npm install --save electron
```

In order to use the development tools, open `main.js` and note `line 8`. Comment it out or delete it, so that you can open the 
development tools while an instance of the app is running.

```
process.env.NODE_ENV = 'production'; //delete this line to allow for dev tools
```

Enter the following command into the terminal to run the app. Explore it to see how it currently functions.

```
npm start
```

At this point, you're ready to change the code as you like and have fun with it! You can keep the app open while you make changes; 
when you're ready to test them, make sure to save all your files, go to the app, reload by pressing `Ctrl+R`, and see your changes!

If you make a major mistake, you may have to terminate the process. This can be done by going to the terminal itself and pressing 
`Ctrl+C`. Make the changes you need to your code and re-start the app by typing `npm start` into the terminal.

## Deployment

I ran into an issue while following the tutorial, and it turned out it was because I was using a newer version of Electron that didn't 
allow node integration within the client-side HTML code. They disabled it by default in newer versions due to a security risk. Since my 
app isn't using any untrustworthy code or linking to an 3rd party webpage, I didn't spend the time to fully understand the problem, 
but please read more about it [here](https://stackoverflow.com/questions/44391448/electron-require-is-not-defined?fbclid=IwAR2kuTFFVLj5oZGtRvcFOuHAPxGtaHwU8QJo8MYF4IXrLSAPzwU95sWW1PM).
The code below makes these changes, and can be found in the `main.js` file on `lines 17-19` and `lines 43-45`.

```
    //Create new window
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true //DO NOT USE THIS if loadURL is a 3rd party webpage or html written by someone else. Security risk. That's why it's disabled by default. Read more: https://stackoverflow.com/questions/44391448/electron-require-is-not-defined?fbclid=IwAR2kuTFFVLj5oZGtRvcFOuHAPxGtaHwU8QJo8MYF4IXrLSAPzwU95sWW1PM
        }
    });
```

When you're ready to deploy your very own desktop application, make sure to disable the development tools by un-commenting 
`line 8` in `main.js`.

```
process.env.NODE_ENV = 'production';
```

You may have to enter the following commands into the terminal to install the Electron Packager then package the app into an executable 
file. (Note: if you're on a mac or linux machine, you may have to replace `win` with `mac` or `linux`, as needed)

```
npm install --save-div electron-packager
npm run package-win
```

Your new desktop app executable file will be found in the `release-builds` folder.

## Built With

* [Electron](https://www.electronjs.org/docs) - The web framework used
* [Materialize](https://materializecss.com/getting-started.html) - Used for style ;)

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on GitHub code of conduct, 
and the process for submitting pull requests.

## Versioning

Use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Brad Travrsy** - *Initial work* - [Electron Tutorial](https://www.youtube.com/watch?v=kN1Czs0m1SU)
* **Michaela Perez** - *Added her own flare to the tutorial* - [LinkedIn](https://www.linkedin.com/in/michaela-perez/)

## License

This project is licensed under the MIT License-- cuz why not?

## Acknowledgments

* Travrsy Media for making a very insightful and fun tutorial! I'm excited to work on a skeleton app for my current project next!
