#LMS Frontend
1. creating a react app by vite and add default dependecy remove 
   ...install by terminal  npm create vite@latest
   
2. we set the taikwind in react app 
   ...intall  npm install -D tailwindcss postcss autoprefixer
              npx tailwindcss init -p
              npx tailwindcss init
   ...content  content: [  "./index.html", "./src/**/*.{js,jsx,ts,tsx}",]
   ... index.css file @tailwind base;
                      @tailwind components;
                      @tailwind utilities;
   ... add the following details in the plugin of tailwind
        plugins: [require("daisyui"),require("@tailwindcss/line-clamp")]
3. install dependency 
   ...  npm install @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 
   ...  npm install      chart.js daisyui axios react-hot-toast    
   ...  npm install    @tailwindcss/line-clamp
4. add react hot toast 
   ...  Toaster 
5. import the reduxtoolkit  authuntication in slice 
   store the reducer in store file 
6. axios import  and set up to the bakend 