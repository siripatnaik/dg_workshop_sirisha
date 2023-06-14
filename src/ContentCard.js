import { Utils } from "@lightningjs/sdk";
import Lightning from "@lightningjs/sdk/src/Lightning";

export default class ContentCard extends Lightning.Component{
    static _template(){
        return {
            w:150,
            h:250,
            flex:{
                direction:"column",
                alignContent:"flex-start",
                alignItems:"flex-start",
                justifyContent:"space-between"
            },
            Thumbnail:{
                w:w=>w,
                h:230,
                Contain:{
                    w:150,
                    h:230,
                    src:Utils.asset("images/slices/poster1.jpg"),
                    ThumbnailBorder:{
                        visible:false,
                        zIndex:2,
                        w:w=>w+10,
                        h:h=>h+10,
                        x:w=>w/2,
                        y:h=>h/2,
                        mount:0.5,
                        texture: Lightning.Tools.getRoundRect(
                            155,235,
                            5,
                            6,0xff00ff0c,
                            false
                        )
                    },
                },
            },
            AssetTitle:{
                flexItem:{marginTop:10},
                text:{
                    text:this.bindProp("assetTitle"),
                    fontFace:"Light",
                    fontSize:18,
                    wordwrap:true,
                    wordWrapWidth:145,
                    maxLines:3,
                }
            }
        }
    }

    set contentData(data){
        this.assetData=data;
        this.assetTitle = data.name;
        //case handling: if no image link is provided use placeholder
        this.tag("Thumbnail.Contain").src = Utils.asset("images/slices/"+
                            (data["poster-image"] ? data["poster-image"] : "placeholder_for_missing_posters.png"));

        //case handling: if there is any error in the image provided, use placeholder
        this.tag("Thumbnail.Contain").on("txError",()=>{
            this.tag("Thumbnail.Contain").src = Utils.asset("images/slices/placeholder_for_missing_posters.png");
            console.error("IMG ERR - Image Texture Issue - couldnt load the image ",data["poster-image"]);
        })
    }

    _focus(){
        this.tag("ThumbnailBorder").visible = true;
        this.fireAncestors("$updateContentDetails",this.assetData)
    }
    
    _unfocus(){
        this.tag("ThumbnailBorder").visible = false;
    }

    static get width(){
        return 150;
    }

    static get height(){
        return 250;
    }
}