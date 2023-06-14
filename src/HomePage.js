import Lightning from "@lightningjs/sdk/src/Lightning";
import {List} from "@lightningjs/ui"
import ContentCard from "./ContentCard";
import LISTINGPAGE1 from "./API/CONTENTLISTINGPAGE-PAGE1.json";
import LISTINGPAGE2 from "./API/CONTENTLISTINGPAGE-PAGE2.json";
import LISTINGPAGE3 from "./API/CONTENTLISTINGPAGE-PAGE3.json";

export default class HomePage extends Lightning.Component{
    static _template(){
        return {
            w:w=>w,
            h:h=>h,
            clipping:true,
            flex:{
                direction:"column",
                alignContent:"center",
                alignItems:"flex-start",
                justifyContent:"flex-start"
            },
            ContentTitle:{
                w:w=>w,
                h:h=>h*0.1,
                TitleText:{
                    text: {
                        text: this.bindProp("cTitle"),
                        fontFace: "Bold",
                        textColor: 0xffffffff,
                        fontSize: 28,
                      },
                }
            },
            ContentDescription:{
                w:w=>w*0.5,
                h:h=>h*0.2,
                clipping:true,
                Description:{
                    text: {
                        text: this.bindProp("cDesc"),
                        fontFace: "Regular",
                        textColor: 0xffffffff,
                        fontSize: 26,
                        lineHeight: 35,
                        maxLines: 2,
                        wordWrap: true,
                        wordWrapWidth: 600,
                        maxLinesSuffix: "...",
                      },
                }
            },
            TrayTitle:{
                w:w=>w,
                h:h=>h*0.1,
                TrayTitleText:{
                    text:{
                        text:"Rom Comy",
                        fontFace: "Bold",
                        textColor: 0xffffffff,
                        fontSize: 28,
                    }
                }
            },
            ContentsTray:{
                w:w=>w,
                h:h=>h*0.5,
                x:7,
                type : List,
                direction: "row",
                signals: {
                    onIndexChanged: true,
                    onRequestItems: true,
                },
                enableRequests:true,
                requestThreshold:3,
                gcThreshold:6,
                spacing:12,
                scroll:{
                    after:6
                }
            }
        }
    }

    _getFocused(){
        return this.tag("ContentsTray");
    }

    _init(){
        //pages array to maintain the json data pages
        this.lpages = [LISTINGPAGE1, LISTINGPAGE2, LISTINGPAGE3]
        //currentPage identifies the most recent listing page which is loaded
       this._currentPage=0;

        //animations
        this.titleLoadAnimation = this.animation({
            duration:0.5,
            actions:[
                {
                    t:"ContentTitle",
                    p:"alpha",
                    v:{0:0, 0.4:0.4, 0.6:0.7,1:1}
                },
                {
                    t:"ContentDescription",
                    p:"alpha",
                    v:{0:0, 0.4:0.4, 0.6:0.7,1:1}
                }
            ]
        });

        this.loadPage(this._currentPage);
    }

    //funtction to update the focused content's title and description in home Page
    //input : content details object with {name,description}
    $updateContentDetails(cdetails){
        this.cTitle = cdetails.name 
        this.cDesc = cdetails?.description ?? "";
        this.titleLoadAnimation.start();
    }

    //function to load the latest page from json files
    //input : the page id in the lpages array which is to be loaded
    loadPage(id){
        let cArray= [];
        let contents = this.lpages[id].page["content-items"].content
        console.log("Received contents : ",contents);
        //pushing all contents at once due to requirement : one page can be loaded at a time
        for(let i=0;i < contents.length ; i++){
            cArray.push({
                type:ContentCard,
                contentData : contents[i],
            });
        }
        //case handling: if there are no items to add return false indicating the same
        if(cArray.length>0){
            this.tag("ContentsTray").add(cArray);
            this._currentPage = id;
            this.$updateContentDetails(this.lpages[id].page["content-items"].content[0]);
            this.tag("TrayTitleText").text.text = this.lpages[id].page.title;
            return true;
        }
        return false;
    }

    async onRequestItems(){
        if(this._currentPage+1<this.lpages.length){
           return await this.loadPage(this._currentPage+1);
        }
    }

}