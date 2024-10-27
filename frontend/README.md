# Simple Scheduling Calendar Project

## What is the use of this project

This Project is a Article Management App which allows users to do following

1. Viewing list of all the articles stored in the server
2. Select one article and able to edit it
3. Add a new article and save it

## Techstacks

`React`, `Tailwind CSS`, `Next.JS`, `Typescript`, `PlateJS`

## Prerequisites

### Install Node JS

Refer to https://nodejs.org/en/ to install nodejs

## Cloning and Running the Application in local

`Clone the project into local`

You can clone this public project from this URL: git@github.com:duwand-dev/Article-Management-System.git

Install all the npm packages. Go into the project folder and type the following command to install all npm packages

```bash
npm install
```

In order to run the application Type the following command

```bash
npm start
```

The Application Runs on **localhost:3000**

## Challenge

**Getting Article data from the PlateJS** : This was the most challenging thing because I PlateJS does not support getting value from it anytime. I used onChange event to implement it.

**Setting initial data to the PlateJS** : It is challenging because there are two types of articles in editor - new article and updating article. I used useEffect hook to solve it.
