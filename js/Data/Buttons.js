"use strict";

class Buttons{

    constructor(){
        
        //saves buttons reference to the DOM
        //this way we can add/remove listeners freely
        this.pauseMenu = {};
        this.startMenu = {};
        this.loginRegMenu = {};
        this.popUpMenu = {};
        this.mainMenu = {};
        this.levelMenu = {};
        this.chooseSpaceshipMenu = {};
        this.leaderBoard = {};
        this.controlsMenu = {};
        this.creditsMenu = {};
        this.helpMenu = {};

        //pause
        var muteM = document.getElementById("pauseMenu_muteM");
        this.pauseMenu["muteM"] = muteM;
        var volumeLowM = document.getElementById("pauseMenu_volumeLowM");
        this.pauseMenu["volumeLowM"] = volumeLowM;
        var volumeHighM   = document.getElementById("pauseMenu_volumeHighM");
        this.pauseMenu["volumeHighM"] = volumeHighM;
        
        var muteS = document.getElementById("pauseMenu_muteS");
        this.pauseMenu["muteS"] = muteS;
        var volumeLowS = document.getElementById("pauseMenu_volumeLowS");
        this.pauseMenu["volumeLowS"] = volumeLowS;
        var volumeHighS   = document.getElementById("pauseMenu_volumeHighS");
        this.pauseMenu["volumeHighS"] = volumeHighS;

        var back = document.getElementById("pauseMenu_back");
        this.pauseMenu["back"] = back;


        //startMenu
        var startButton = document.getElementById("startMenu_startButton");
        this.startMenu["startButton"] = startButton;


        //loginRegMenu
        var signUpButton = document.getElementById("loginRegMenu_signUpButton");
        this.loginRegMenu["signUpButton"] = signUpButton;
        var loginButton = document.getElementById("loginRegMenu_loginButton");
        this.loginRegMenu["loginButton"] = loginButton;

        //popUpMenu
        var yesButton = document.getElementById("popUpMenu_yesButton");
        this.popUpMenu["yesButton"] = yesButton;
        var okButton = document.getElementById("popUpMenu_okButton");
        this.popUpMenu["okButton"] = okButton;
        var noButton = document.getElementById("popUpMenu_noButton");
        this.popUpMenu["noButton"] = noButton;

        //mainMenu
        var campaign = document.getElementById("mainMenu_campaign");
        this.mainMenu["campaign"] = campaign;
        var endless = document.getElementById("mainMenu_endless");
        this.mainMenu["endless"] = endless;
        var editor   = document.getElementById("mainMenu_editor");
        this.mainMenu["editor"] = editor;

        var leave   = document.getElementById("mainMenu_leave");
        this.mainMenu["leave"] = leave;
        var help   = document.getElementById("mainMenu_help");
        this.mainMenu["help"] = help;
        var credits = document.getElementById("mainMenu_credits");
        this.mainMenu["credits"] = credits;
        var leaderBoard = document.getElementById("mainMenu_leaderBoard");
        this.mainMenu["leaderBoard"] = leaderBoard;
        var controls = document.getElementById("mainMenu_controls");
        this.mainMenu["controls"] = controls;

        //levelMenu
        var level1 = document.getElementById("levelMenu_level1");
        this.levelMenu["level1"] = level1;
        var level2 = document.getElementById("levelMenu_level2");
        this.levelMenu["level2"] = level2;
        var level3   = document.getElementById("levelMenu_level3");
        this.levelMenu["level3"] = level3;
        var speedrun   = document.getElementById("levelMenu_speedrun");
        this.levelMenu["speedrun"] = speedrun;
        var back   = document.getElementById("levelMenu_back");
        this.levelMenu["back"] = back;

        //chooseSpaceshipMenu
        var left = document.getElementById("chooseSpaceshipMenu_left");
        this.chooseSpaceshipMenu["left"] = left;
        var right = document.getElementById("chooseSpaceshipMenu_right");
        this.chooseSpaceshipMenu["right"] = right;
        var go   = document.getElementById("chooseSpaceshipMenu_go");
        this.chooseSpaceshipMenu["go"] = go;
        var backChooseSpaceship   = document.getElementById("chooseSpaceshipMenu_backChooseSpaceship");
        this.chooseSpaceshipMenu["backChooseSpaceship"] = backChooseSpaceship;


        //creditsMenu
        var backCredits = document.getElementById("creditsMenu_backCredits");
        this.creditsMenu["backCredits"] = backCredits;

        //helpMenu
        var backHelp = document.getElementById("helpMenu_backHelp");
        this.helpMenu["backHelp"] = backHelp;
        var nextHelp = document.getElementById("helpMenu_nextHelp");
        this.helpMenu["nextHelp"] = nextHelp;

        //controlsMenu
        var backControl = document.getElementById("controlsMenu_backControl");
        this.controlsMenu["backControl"] = backControl;
        var nextControl = document.getElementById("controlsMenu_nextControl");
        this.controlsMenu["nextControl"] = nextControl;
        var playControl = document.getElementById("controlsMenu_playControl");
        this.controlsMenu["playControl"] = playControl;

        //leaderBoard
        var leaderBoardBack = document.getElementById("leaderBoard_leaderBoardBack");
        this.leaderBoard["leaderBoardBack"] = leaderBoardBack;
    }
}