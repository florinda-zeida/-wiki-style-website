# Semester Project 2 Resit 

## Goal 

To create a wiki-style tool for storing information about front-end development. 

## Brief 

You have been tasked with creating a wiki-style website for front-end developers to store information about coding including syntax, and examples of how to create elements for a site. 

Here are a list of functional requirements: 
- A user should be able to see a list of posts. 
- A user should be able to search for a specific post. You can use client-side filtering, or use the search parameter on the API itself.  
- A user should be able to log in 
- A user who hasn’t logged in shouldn’t be able to edit any of the entries on the site. 
- A user should be able to create a post 
- A user should be able to update a post 
- A user should be able to delete a post 

You should use WordPress as a headless CMS to manage the content. It’s important to note that the editing of the content should happen on the front-end built by you, not the WordPress admin panel. You need to be making PUT and POST requests yourself to maintain the content on the site, and be fetching content from the WordPress REST API. 

The API that you create and serve through WordPress is one part of the project. You’re just using WordPress for the API it gives you. 

The second part of the project is the front-end code; a completely distinct project. 

## Level 1 Process 
1. Design the website using a prototyping tool of your choice (Adobe XD, Sketch etc.) 
2. Create your WordPress installation on your web host 
3. Make your own example posts so that you have data to start off. You will need at least 10 posts for the site. 
4. Use your created repository for the files for your front-end code.
5. Set up your API call to fetch data from the WordPress REST API and display it in your website. For more information on working with the WordPress REST API, please visit https://developer.wordpress.org/rest-api/  
6. Create the login system and manage the authentication to ensure you can make PUT, POST and DELETE requests. Include the login details for an already created user in your report for the markers to use. 
7. Build the forms for creating, updating and deleting a post. 
8. Make the search functionality for user's to find posts.
9. Ensure everything is pushed to the repository created for this project.

## Submission 

Submit a link to the repository of the website you’ve created, as well as a report. You can use [this template](https://interactive-content.now.sh/resources/semester-project-2-report-template.docx) for your report. 
