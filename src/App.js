import { Lightning, Registry, Utils } from '@lightningjs/sdk'
import HomePage from './HomePage'

export default class App extends Lightning.Component {
  static getFonts() {
    return [
      { family: 'Regular', url: Utils.asset('fonts/TitilliumWeb-Regular.ttf') },
      { family: 'Light', url: Utils.asset('fonts/TitilliumWeb-Light.ttf') },
      { family: 'Bold', url: Utils.asset('fonts/TitilliumWeb-Bold.ttf') },
      { family: 'SemiBold', url: Utils.asset('fonts/TitilliumWeb-SemiBold.ttf') },
      { family: 'ExtraLight', url: Utils.asset('fonts/TitilliumWeb-ExtraLight.ttf') },
  ]
  }

  static _template() {
    return {
      w:1280,
      h:720,
        rect:true,
        color: 0xff141414,
    
      flex:{
        direction: "column",
        alignContent:"space-around",
        alignItems:"center",
        justifyContent:"space-evenly"
      },
      TitleSpace:{
        w:w=>w,
        h:h=>h*0.05,
        flex:{
          direction:"row",
          alignContent:"center",
        alignItems:"center",
        justifyContent:"center"
        },
        Title:{
        text:{
          text:"LIGHTNING WORKSHOP",
          fontFace:"SemiBold",
          fontSize:25,
        }
        },
        Clock:{
          flexItem:false,
          x:w=>w-100,
          y:20,
          mount:0.5,
          text:{
            text:this.bindProp("currentTime"),
            fontFace:"ExtraLight",
            fontSize:45,
            color:0xff747474,
          }
        },
      
      },
      PageContent:{
        w:w=>w*0.9,
        h:h=>h*0.8,
        // rect:true,
        // color:0xff000000
        type: HomePage

      }
    }
  }

  _active(){
    //set initial time
    let timeNow = new Date()
    this.currentTime = timeNow.toTimeString(navigator.language,{hour: '2-digit', minute:'2-digit'}).substring(0,5);

    //update timer for every second
    Registry.setInterval(() => {
      let timeNow = new Date()
    this.currentTime = timeNow.toTimeString(navigator.language,{hour: '2-digit', minute:'2-digit'}).substring(0,5);
    }, 1000);
}

  _getFocused(){
    return this.tag("PageContent")
  }

  _inactive(){
    Registry.clearIntervals();
  }
}
