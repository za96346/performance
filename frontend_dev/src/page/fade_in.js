export function fade_in(style,set_style,time,transition){
    var timer=setTimeout(() => {
        set_style({...style,opacity:1,transition:transition})
    },time);
}