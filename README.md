# React Real time tracking app

Simple application for tracking moving vehicles and rendering them on the map ( using leaflet ) and show warning for vehicles that has problems like battery problem for example 

Application also display simple chart which display percentage between working and not working vehicles 
Application also show live list of vehicles and when you click on any of them it zoom to it in the map 

Backend is done using nodeJs ( in a separat repo https://github.com/mregydev/trackingLiveService ) and make use of socket.io 

# Running the application on the local

Application iis deployed online on https://tracking-app-eta.vercel.app/
To run the client side  locally , clone the project and just run   ``` npm run dev ```

# Running local version of the tracking service 
- Clone tracking service from https://github.com/mregydev/trackingLiveService
- Run ``` node server ```
- In the trackingApp project update enviroment variable `` VITE_SOCKET_URL ``  to be ```http://localhost:3000/```


# Features 
- Draggable and resizable widgets which can be minized for better map view and interactions
- You can perform identify operations by clicking on the vehiclea and then details related to it will appear in a widget
- You can see list of vehicles in the list widget and by clicking on any vehicle , map will zoom to its location and details of it will appear
- There is map tools in the upper left which contains zoom in and zoom out and zoom to full extent which makes map zoom to cologne bounds ( bounds in which vehicles move) and other features

# Performance 
- Minimal number of rerender thats happening because of the live update as only affected components are rendered
- Good accessability and ensuring that elements are well structured and described 
- Good INP as its 40ms which is very good for live app
