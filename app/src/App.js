import './App.css';
import React from "react";
import Display from './components/Display';

function App() {

  const[channelData, setChannelData] = React.useState("");
  const[display, setDisplay] = React.useState();

  function isURL(stringInput) {
    // Regular expression to match URL pattern
    const urlPattern = /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
  
    // Test if the string matches the URL pattern
    return urlPattern.test(stringInput);
  }

  function handleClickSearch(){
    const searchQuery = document.querySelector(".search-bar").value;
    
    if(searchQuery){
      var channelID = "";

      if(isURL(searchQuery)){
        //searchQuery is a link to the YouTube Channel
        //https://www.youtube.com/@GoogleDevelopers
        const atIndex = searchQuery.indexOf("/@");
        channelID = searchQuery.slice(atIndex + 2);
      }

      else {
        //searchQuery is the channel ID
        channelID = searchQuery;
      }

      const url = `https://youtube.googleapis.com/youtube/v3/channels?part=brandingSettings,snippet,statistics&forHandle=@${channelID}&key=${API_KEY}`;
      fetch(url)
      .then(res => res.json())
      .then(data => setChannelData(data)) 
      .catch(error => console.log(error));
    }

    else alert("Enter a Search Query!");
  }

  React.useEffect(() => {
    if(channelData){
      const channelName = channelData.items[0].brandingSettings.channel.title;
      const channelCountry = channelData.items[0].brandingSettings.channel.country;
      const channelDesc = channelData.items[0].brandingSettings.channel.description;
      const channelThumbnail = channelData.items[0].snippet.thumbnails.default.url;
      const videoCount = channelData.items[0].statistics.videoCount;
      const subsCount = channelData.items[0].statistics.subscriberCount;
      const views = channelData.items[0].statistics.viewCount;

      const newDisplay = (
        <Display
          name = {channelName}
          desc = {channelDesc}
          countryCode = {channelCountry}
          picture = {channelThumbnail}
          videoCount = {videoCount}
          subsCount = {subsCount}
          views = {views}
        />
      );
      setDisplay(newDisplay);
    }
  }, [channelData])


  return (
    <div className='info-container'>
      <div className="search">
        <input className = "search-bar" placeholder = "Enter YouTube Channel Name"></input>
        <button className="search-button" onClick={handleClickSearch}>Search Info</button>
      </div>

      {channelData && display}
    </div>
  );
}

export default App;
