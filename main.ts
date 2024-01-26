controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mode == "menu") {
        mitem += 0 - 1
        if (mitem < 1) {
            mitem = 4
        }
    } else if (mode == "game") {
        if (!(ballsmoving()) && wt == 0) {
            for (let b2 of balls) {
                b2.ys = -spd
b2.xs = 0
            }
            balls.sort(bottomup)
strokes += 1
        }
    }
})
// blockSettings.clear()
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
function rectfill (x0: number, y0: number, x1: number, y1: number, col: number) {
    screen.fillRect(x0 - scene.cameraLeft(), y0 - scene.cameraTop(), x1 - x0 + 1, y1 - y0 + 1, col)
}
function dist (x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}
function loadlevel () {
    mx = 0
    my = 0
    balls = []
    holes = []
    water = []
    sand = []
    dust = []
    flags = []
    switches = []
    strokes = 0
    wt = 0
    level_width = mx + 16
    mapsData = Buffer.create(20*15)
tiles.loadMap(allMaps[level])
    for (let loc of tiles.getTilesByType(assets.tile`myTile2`)) {
        mapsData.setUint8((loc.column | 0) + (loc.row | 0) * 20, 35);
    }
    for (let loc2 of tiles.getTilesByType(assets.tile`myTile`)) {
        mapsData.setUint8((loc2.column | 0) + (loc2.row | 0) * 20, 2);
    }
    for (let loc3 of tiles.getTilesByType(assets.tile`myTile1`)) {
        mapsData.setUint8((loc3.column | 0) + (loc3.row | 0) * 20, 4);
    }
    for (let loc4 of tiles.getTilesByType(img`myImage11`)) {
        mapsData.setUint8((loc4.column | 0) + (loc4.row | 0) * 20, 23);
    }
    for (let loc5 of tiles.getTilesByType(assets.tile`myTile3`)) {
        mapsData.setUint8((loc5.column | 0) + (loc5.row | 0) * 20, 7);
    }
    for (let loc6 of tiles.getTilesByType(assets.tile`myTile4`)) {
        mapsData.setUint8((loc6.column | 0) + (loc6.row | 0) * 20, 6);
    }
    for (let loc7 of tiles.getTilesByType(assets.tile`myTile5`)) {
        mapsData.setUint8((loc7.column | 0) + (loc7.row | 0) * 20, 36);
    }
    for (let loc8 of tiles.getTilesByType(assets.tile`myTile6`)) {
        mapsData.setUint8((loc8.column | 0) + (loc8.row | 0) * 20, 18);
    }
    for (let loc9 of tiles.getTilesByType(assets.tile`myTile7`)) {
        mapsData.setUint8((loc9.column | 0) + (loc9.row | 0) * 20, 17);
    }
    for (let i3 = mx;i3 <= mx+19;i3++) {
        for (let j2 = my;j2 <= my+14;j2++) {
            if (mget(i3,j2) == 35) {
                new Ball((i3 - mx) * 8, (j2 - my) * 8);
            } else if (mget(i3, j2) == 23) {
                mset(i3, j2, 4)
                new Hole((i3 - mx) * 8, (j2 - my) * 8, i3, j2)
            } else if (mget(i3,j2) == 36) {
                new Ball((i3 - mx) * 8, (j2 - my) * 8,true);
            } else if (fget(mget(i3,j2),1)) {
                new Hole((i3 - mx) * 8, (j2 - my) * 8, i3, j2)
            } else if (mget(i3,j2) == 7) {
                new Water((i3 - mx) * 8, (j2 - my) * 8)
            } else if(mget(i3,j2) == 6) {
                new Sand((i3 - mx) * 8, (j2 - my) * 8)
            } else if(mget(i3,j2) == 17) {
                new Switch((i3 - mx) * 8, (j2 - my) * 8, i3, j2)
            }
        }
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mode == "menu") {
        if (mitem == 4) {
            mode = "game"
            level = mhole - 1
            loadlevel()
        }
    } else if (mode == "game") {
        if (wt == 0) {
            loadlevel()
        }
    } else if (mode == "win") {
        mode = "menu"
    }
})
function dGetMaxLevel () {
    return blockSettings.readNumber(cartName + dkeymaxlvl) || 0
}
function dGetLevelScore (lvl: number) {
    return blockSettings.readNumber(cartName + dkeyscore + lvl) || 0
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mode == "menu") {
        if (mitem == 1) {
            if (mhole > 1) {
                mhole += 0 - 1
            }
        }
    } else if (mode == "game") {
        if (!(ballsmoving()) && wt == 0) {
            for (let g of balls) {
                g.ys = 0
g.xs = -spd
            }
            balls.sort(rtol)
strokes += 1
        }
    }
})
function ballsmoving () {
    for (let f of balls) {
        if (f.xs != 0 || f.ys != 0) {
            isanyballmoving = true
        }
    }
    return isanyballmoving
}
function createDust (dx: number, dy: number, dc: number) {
    for (let w = 1;w<=10;w++) {
        let a = new Dust(dx,dy,dc)
        dust.push(a)
    }
}
function opendoors () {
    if (allswitchespressed()) {
        for (let r = mx;r <= mx + 19;r++) {
            for(let s = my; s < my+14;s++) {
                if (mget(r,s) == 18) {
                    mset(r,s,20)
                }
            }
        }
    } else {
        for (let t = mx;t <= mx+19;t++) {
            for (let u =my;u<=my+14;u++) {
                if (mget(t,u) == 20) {
                    mset(t,u,18)
                }
            }
        }
    }
}
function fget (sp: number, flag: number) {
    if (sp == 2) {
        if (flag == 0) {
            return 1
        }
    } else if (sp == 4) {
        if (flag == 1) {
            return 1
        }
    } else if (sp == 18) {
        if (flag == 0) {
            return 1
        }
    }
    return 0
}
function updateballs () {
    for (let v of balls) {
        if (v.xs != 0 || v.ys != 0) {
            v.nx = v.x + v.xs
v.ny = v.y + v.ys
if (v.didcollide()) {
                v.x = Math.floor(v.x / 8) * 8
v.y = Math.floor(v.y / 8) * 8
v.xs = 0
v.ys = 0
            }
            v.x += v.xs
v.y += v.ys
        } else {
            v.lastsand = null
        }
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mode == "menu") {
        if (mitem == 1) {
            if (mhole < 32 && levelunlocked > mhole - 1) {
                mhole += 1
            }
        }
    } else if (mode == "game") {
        if (!(ballsmoving()) && wt == 0) {
            for (let h of balls) {
                h.ys = 0
h.xs = spd
            }
            balls.sort(ltor)
strokes += 1
        }
    }
})
function restoremap () {
    for(let k = mx;k<=mx+19;k++) {
        for(let l =my;l<=my+14;l++) {
            if(mget(k,l) == 24) {
                mset(k,l,4)
            }
        }
    }
}
function gameInit () {
    spd = 2
    mx = 0
    my = 0
    for (let i2 = 0; i2 <= 31; i2++) {
        scores.push(dGetLevelScore(i2))
    }
    levelunlocked = dGetMaxLevel()
    mhole = Math.min(levelunlocked + 1, 32)
}
function dSetMaxLevel (data: number) {
    blockSettings.writeNumber("" + cartName + dkeymaxlvl, data)
}
function drawtext (txt: number, dx: number, dy: number) {
    let sstr2 = txt.toString()
for (let o = 0; o <= sstr2.length - 1; o++) {
        spr(80 + parseInt(sstr2.substr(o,1)), dx + o * 8, dy)
    }
}
function drawpar (txt: number, pt: number, dx: number, dy: number) {
    let sstr = txt.toString()
let pstr = pt.toString()
for (let m = 0; m <= sstr.length - 1; m++) {
        spr(80 + parseInt(sstr.substr(m, 1)), dx + m  * 8, dy)
    }
    spr(90, dx + (sstr.length * 8), dy)
for (let n = 0; n <= pstr.length - 1; n++) {
        spr(80 + parseInt(pstr.substr(n, 1)), dx + (n+1) * 8 + (sstr.length * 8), dy)
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mode == "menu") {
        mitem += 1
        if (mitem > 4) {
            mitem = 1
        }
    } else if (mode == "game") {
        if (!(ballsmoving()) && wt == 0) {
            for (let b3 of balls) {
                b3.ys = spd
b3.xs = 0
            }
            balls.sort(topdown)
strokes += 1
        }
    }
})
function mset (c: number, r: number, snum: number) {
    mapsData.setUint8((c | 0) + (r | 0) * 20, snum);
if (snum == 23) {
        tiles.setTileAt(tiles.getTileLocation(c, r), img`myImage11`)
    } else if (snum == 24) {
        tiles.setTileAt(tiles.getTileLocation(c, r), img`myImage12`)
    } else if (snum == 18) {
        tiles.setTileAt(tiles.getTileLocation(c, r), assets.tile`myTile6`)
    } else if (snum == 20) {
        tiles.setTileAt(tiles.getTileLocation(c, r), assets.tile`myTile0`)
    } else if (snum == 4) {
        tiles.setTileAt(tiles.getTileLocation(c, r), assets.tile`myTile1`)
    }
}
function mget (c: number, r: number) {
    return mapsData.getUint8((c | 0) + (r | 0) * 20)
}
function dSetLevelScore (lvl: number, data: number) {
    blockSettings.writeNumber("" + cartName + dkeyscore + lvl, data)
}
function allswitchespressed () {
    for (let sw of switches) {
        if (!(sw.pressed)) {
            return false
        }
    }
    return true
}
function mapfillCircle (cx: number, cy: number, r: number, c: number) {
    screen.fillCircle(cx - scene.cameraLeft(), cy - scene.cameraTop(), r, c)
}
function printo (str: string, startx: number, starty: number, col: number, col_bg: number) {
    print(str, startx + 1, starty, col_bg)
print(str, startx - 1, starty, col_bg)
print(str, startx, starty + 1, col_bg)
print(str, startx, starty - 1, col_bg)
print(str, startx + 1, starty - 1, col_bg)
print(str, startx - 1, starty - 1, col_bg)
print(str, startx - 1, starty + 1, col_bg)
print(str, startx + 1, starty + 1, col_bg)
print(str, startx, starty, col)
}
function pset (cx: number, cy: number, col: number) {
    screen.setPixel(cx - scene.cameraLeft(), cy - scene.cameraTop(), col)
}
function didwin () {
    if (wt > 0) {
        return true
    }
    for (let i4 = mx;i4<=mx+19;i4++) {
        for(let j3 = my;j3<=my+14;j3++) {
            if(mget(i4,j3) == 4) {
                return false
            }
        }
    }
for (let i5 = mx; i5 <= mx + 19; i5++) {
        for (let j4 = my + 14; j4 >= my; j4--) {
            if (mget(i5, j4) == 23) {
                mset(i5, j4, 24)
                new Flag(i5,j4)
            }
        }
    }
return true
}
function imageNotDisplayColor (img2: Image, x: number, y: number, color: number) {
    for (let i = x; i < x + img.width; i++) {
        for (let j = y; j < y + img.height; j++) {
            if (img.getPixel(i - x, j - y) == color) {
                img.setPixel(i - x, j - y, screen.getPixel(i, j))
            }
        }
    }
}
let gs = 0
let isanyballmoving = false
let wt = 0
let allMaps: tiles.WorldMap[] = []
let mhole = 0
let mitem = 0
let mode = ""
let dkeymaxlvl = ""
let dkeyscore = ""
let cartName = ""
let scores:number[] = []
let level = 0
let levelunlocked = 0
let strokes = 0
let water:Water[] = []
let switches: Switch[] = []
let flags: Flag[]  = []
let dust:Dust[] = []
let sand:Sand[] = []
let holes: Hole[] = []
let balls: Ball[] = []
function mapdrawImage(from: Image, x: number, y: number, flip_x?: boolean, flip_y?: boolean, isNotTransparent?: boolean, ignoreColor?: number) {

    if (flip_x) {
        from.flipX()
    }
    if (flip_y) {
        from.flipY()
    }
    if (isNotTransparent) {
        if (ignoreColor) {
            imageNotDisplayColor(from, x - scene.cameraLeft(), y - scene.cameraTop(), ignoreColor);
            screen.drawImage(from, x - scene.cameraLeft(), y - scene.cameraTop())
        } else {
            screen.drawImage(from, x - scene.cameraLeft(), y - scene.cameraTop())
        }
    } else {
        screen.drawTransparentImage(from, x - scene.cameraLeft(), y - scene.cameraTop())
    }

}
function spr(n: number, x: number, y: number, w?: number, h?: number, flip_x?: boolean, flip_y?: boolean) {
    if (n == 64) {
        mapdrawImage(assets.image`myImage7`, x, y, flip_x, flip_y)
    } else if (n == 68) {
        mapdrawImage(assets.image`myImage8`, x, y, flip_x, flip_y)
    } else if (n == 72) {
        mapdrawImage(assets.image`myImage9`, x, y, flip_x, flip_y)
    } else if (n == 3) {
        mapdrawImage(assets.image`myImage0`, x, y, flip_x, flip_y)
    } else if (n == 19) {
        mapdrawImage(assets.image`myImage10`, x, y, flip_x, flip_y)
    } else if (n == 8) {
        mapdrawImage(assets.image`myImage13`, x, y, flip_x, flip_y)
    } else if (n == 9) {
        mapdrawImage(assets.image`myImage14`, x, y, flip_x, flip_y)
    } else if (n == 10) {
        mapdrawImage(assets.image`myImage15`, x, y, flip_x, flip_y)
    } else if (n == 11) {
        mapdrawImage(assets.image`myImage16`, x, y, flip_x, flip_y)
    } else if (n == 91) {
        mapdrawImage(assets.image`myImage17`, x, y, flip_x, flip_y)        
    } else if (n == 80) {
        mapdrawImage(assets.image`myImage18`, x, y, flip_x, flip_y)
    } else if (n == 81) {
        mapdrawImage(assets.image`myImage19`, x, y, flip_x, flip_y)
    } else if (n == 82) {
        mapdrawImage(assets.image`myImage20`, x, y, flip_x, flip_y)
    } else if (n == 83) {
        mapdrawImage(assets.image`myImage21`, x, y, flip_x, flip_y)
    } else if (n == 84) {
        mapdrawImage(assets.image`myImage22`, x, y, flip_x, flip_y)
    } else if (n == 85) {
        mapdrawImage(assets.image`myImage23`, x, y, flip_x, flip_y)
    } else if (n == 86) {
        mapdrawImage(assets.image`myImage24`, x, y, flip_x, flip_y)
    } else if (n == 87) {
        mapdrawImage(assets.image`myImage25`, x, y, flip_x, flip_y)
    } else if (n == 88) {
        mapdrawImage(assets.image`myImage26`, x, y, flip_x, flip_y)
    } else if (n == 89) {
        mapdrawImage(assets.image`myImage27`, x, y, flip_x, flip_y)
    } else if (n == 90) {
        mapdrawImage(assets.image`myImage28`, x, y, flip_x, flip_y)
    } else if (n == 96) {
        mapdrawImage(assets.image`myImage29`, x, y, flip_x, flip_y)
    } else if (n == 34) {
        mapdrawImage(assets.image`myImage30`, x, y, flip_x, flip_y)
    } else if (n == 32) {
        mapdrawImage(assets.image`myImage31`, x, y, flip_x, flip_y)
    } else if (n == 33) {
        mapdrawImage(assets.image`myImage32`, x, y, flip_x, flip_y)
    } 
}
function print(text: string, x: number, y: number, color?: number) {
    screen.print(text, x - scene.cameraLeft(), y - scene.cameraTop(), color, image.font5)
}
function printc(str: string, x: number, y: number,col: number, col_bg?: number,special_chars?: number) {
    let spc = special_chars || 0

    let len = (str.length * 4) + (spc * 3)
    let startx = x - (len / 2)
    let starty = y - 2
    printo(str, startx, starty, col, col_bg)
}
game.onShade(function() {
    //background grooves
    //foreach(grass, drawgrass)
    //screen.fill(0)
    if (mode == "menu") {
        rectfill(0, 16, 159, 28, 1)
        spr(64, 48+16, 19, 4, 1)

        rectfill(0, 32, 159, 44, 3)
        spr(68, 48 + 16, 35, 4, 1)

        rectfill(0, 48, 159, 60, 1)
        spr(72, 36 + 16, 51, 7, 1)

        let fgc = 0;
        let bgc = 1;
        if (mitem == 1) {
            fgc = 7;
            bgc = 3;
            if  (mhole < 32 && levelunlocked > mhole - 1) {
                spr(32, 88+24, 72)
            }
            if (mhole > 1) {
                spr(33, 32+8, 72)
            }
        } else {
            fgc = 5;//0 NOT WORK
            bgc = 1;
        }
        printc("HOLE " + mhole, 64 + 8, 76, fgc, bgc)
        if (mitem == 2) {
            fgc = 7;
            bgc = 3;
            spr(34, 88+32, 82+1)
        } else {
            fgc = 5;
            bgc = 1;
        }
        printc("MUSIC: " + tunes, 64 + 8, 86, fgc, bgc)
        if (mitem == 3) {
            fgc = 7;
            bgc = 3;
            spr(34, 88 + 32, 92+1)
        } else {
            fgc = 5;
            bgc = 1;
        }
        printc("SFX: " + sounds, 72, 96, fgc, bgc)

        if (mitem == 4) {
            fgc = 7;
            bgc = 3;
            spr(34, 88+32, 102+1)
        } else {
            fgc = 5;
            bgc = 1;
        }
        printc("PLAY", 76, 106, fgc, bgc)
        printc("tom brinton's".toUpperCase(), 68, 7, 3)
    } else if (mode == "game") {
        //--balls
        for (let ball of balls) {
            ball.drawball()
        }

        //--flags
        for (let flg of flags) {
            flg.drawflag()
        }

        //--dust
        for (let dst of dust) {
            dst.drawdust()
        }

        //--strokes
        drawpar(strokes, pars[level], 1, 1)
        if (scores[level] != 0) {
            printo("BEST:"+scores[level], 2, 11, 6, 1)
        }
        spr(91, 96+32, 1, 2, 1)
        drawtext(level + 1, 112+32, 1)
    } else if (mode == "win") {
        rectfill(0, 8, 159, 20, 1)
        spr(96, 32+16, 11, 8, 1)

        let p = 0
        for (let col = 0;col <=2;col++) {
            for (let row = 0; row <= 11;row++) {
                let c1 = 11;
                let c2 = 3;
                if (scores[p] > pars[p]) {
                    c1 = 8;
                    c2 = 2;
                }
                printo(scores[p] + "/" + pars[p], 20 + col * 54, 24 + row * 10, c1, c2)
                printo((p + 1).toString(),  2+col * 54, 24 + row * 10, 6, 5)
                p += 1
                if (p == 32) {
                    break;
                }
            }
        }
        //--list total score
        let totalscore = 0
        let totalpar = 0
        for (let q = 0; q < 32;q++) {
            totalscore += scores[q]
            totalpar += pars[q]
        }
        printc("total".toUpperCase() , 120, 110 - 4, 7, 1)

        printc(totalscore + "/" + totalpar, 124, 110+4, 7, 1)

        //spr(34, 30, 118-8)
        //printc("return to menu", 68, 122-8, 7, 3)
    }
})
class Ball {
    x:number
    y:number
    s:number
    xs:number
    ys:number
    nx:number
    ny:number
    onsand:boolean
    lastsand:any
    rock:boolean
    constructor(bx:number,by:number,rock?:boolean) {
        this.x = bx
        this.y = by
        this.s = 3
        this.xs = 0
        this.ys = 0
        this.nx = 0
        this.ny = 0
        this.onsand = false
        this.lastsand = null
        if (rock) {
            this.s = 19
            this.rock = true
        }
        balls.push(this)
    }



    didcollide() {
        let collided = false
        let tx = this.nx + 4
        let ty = this.ny + 1
        if (fget(mget(Math.floor(tx / 8) + mx, Math.floor(ty / 8) + my), 0)) {
            collided = true
            createDust(tx, ty, 3)
        }
        //--bottom
        tx = this.nx + 4
        ty = this.ny + 7
        if (fget(mget(Math.floor(tx / 8) + mx, Math.floor(ty / 8) + my), 0)) {
            collided = true
            createDust(tx, ty, 3)
        }
        //--left
        tx = this.nx + 1
        ty = this.ny + 4
        if (fget(mget(Math.floor(tx / 8) + mx, Math.floor(ty / 8) + my), 0) ) {
            collided = true
            createDust(tx, ty, 3)
        }
        //--right
        tx = this.nx + 7
        ty = this.ny + 4
        if (fget(mget(Math.floor(tx / 8) + mx, Math.floor(ty / 8) + my), 0) ) {
            collided = true
            createDust(tx, ty, 3)
        }
        let bx = this.nx + 4
        let by = this.ny + 4
        for (let bb of balls) {
            if (bb == this) {

            } else {
                if (bb.xs == 0 && bb.ys == 0){
                    let bbx = bb.x + 4
                    let bby = bb.y + 4
                    if (Math.abs(bx - bbx) < 8 && Math.abs(by - bby) < 8 ) {
                        collided = true
                        createDust((bx + bbx) / 2, (by + bby) / 2, 6)
                    }
                    
                }
            }
        }
        return collided
    }

    drawball() {
        spr(this.s, this.x, this.y)
    }
}
function bottomup(a: Ball, b: Ball): number {
    return a.y > b.y ? 1 : 0
}
function topdown(a: Ball, b: Ball): number {
    return a.y < b.y ? 1 : 0
}
function rtol(a: Ball, b: Ball): number {
    return a.x > b.x ? 1 : 0
}
function ltor(a: Ball, b: Ball): number {
    return a.x < b.x ? 1 : 0
}
class Hole {
    x:number;
    y:number;
    cx:number;
    cy:number;
    mx:number;
    my:number;
    constructor(hx: number, hy: number, hmx: number, hmy: number) {
        this.x = hx
        this.y = hy
        this.cx = hx+4
        this.cy = hy+4
        this.mx = hmx
        this.my = hmy
        holes.push(this)
    }
    checkhole() {
        for(let b of balls) {
            if (dist(b.x, b.y, this.x, this.y) < 4 && !b.rock) {
                mset(this.mx, this.my, 23)
                balls.removeElement(b)
                holes.removeElement(this)
            }
        }
    }
}
class Water {
    x:number;
    y:number;
    cx:number;
    cy:number;
    constructor(wx:number,wy:number) {
        this.x = wx
        this.y = wy
        this.cx = wx+4
        this.cy = wy+4
        water.push(this)
    }

    checkwater() {
        for(let c of balls) {
            let bcx = c.x + 4
            let bcy = c.y + 4
            if (dist(bcx,bcy,this.cx,this.cy) < 3) {
                createDust(this.cx,this.cy,6)
                balls.removeElement(c)
            }
        }
    }
}
class Sand {
    x:number;
    y:number;
    cx:number;
    cy:number;
    constructor(sx:number,sy:number) {
        this.x = sx
        this.y = sy
        this.cx = sx+4
        this.cy = sy+4
        sand.push(this)
    }

    checksand() {
        for (let d of balls) {
            if (d.lastsand == this) {
                //do nothing
            } else {
                let bcx2 = d.x + 4
                let bcy2 = d.y + 4
                if (dist(bcx2,bcy2,this.cx,this.cy) < 3) {
                    d.xs = 0
                    d.ys = 0
                    d.x = Math.round(d.x/8) * 8
                    d.y = Math.round(d.y/8) * 8
                    d.lastsand = this
                }
            }
        }
    }
}
class Switch {
    x:number;
    y:number;
    cx:number;
    cy:number;
    mx:number;
    my:number;
    pressed:boolean;
    constructor(hx:number,hy:number,hmx:number,hmy:number) {
        this.x = hx
        this.y = hy
        this.cx = hx + 4
        this.cy = hy + 4
        this.mx = hmx
        this.my = hmy
        this.pressed = false
        switches.push(this)
    }

    checkswitch() {
        let ballison = false
        for (let e of balls) {
            if (dist(e.x,e.y,this.x,this.y) < 4) {
                ballison = true
                if (!this.pressed) {

                }
            }
        }
        if (!ballison && this.pressed) {

        }
        this.pressed = ballison
    }
}
class Dust {
    x:number;
    y:number;
    c:number;
    xs:number;
    ys:number;
    t:number;
    constructor(dx: number, dy: number, dc: number) {
        this.x = dx
        this.y = dy
        this.c = dc
        this.xs = -0.5 + Math.random()
        this.ys = -Math.random()
        this.t = 5 + randint(1, 10)
    }

    drawdust(){
        this.x += this.xs
        this.y += this.ys
        this.ys+=0.1
        this.t-=1
        if (this.t <= 0) {
            dust.removeElement(this)
        }
        pset(this.x,this.y,this.c)
    }
}
class Flag {
    x:number;
    y:number;
    s:number;
    at:number;
    constructor(fmx:number,fmy:number) {
        this.x = (fmx - mx) * 8
        this.y = (fmy - my - 1) * 8
        this.s = 8 + randint(0,3)
        this.at = 0
        flags.push(this)
    }
    drawflag() {
        this.at += 1
        if (this.at > 5) {
            this.at = 0
            this.s += 1
            if (this.s == 12) {
                this.s = 8
            }
        }
        spr(this.s,this.x,this.y)
    }
}
// cart data
cartName = "tiny-golf-puzzles"
dkeyscore = "score"
dkeymaxlvl = "maxlvl"
let mapsData: Buffer;
mode = "menu"
let par = 3
mitem = 4
mhole = levelunlocked + 1
let tunes = "on"
let sounds = "on"
let spd:number;
let mx:number;
let my:number;
let level_width:number;
allMaps = [
tiles.createSmallMap(tilemap`level2`),
tiles.createSmallMap(tilemap`level3`),
tiles.createSmallMap(tilemap`level4`),
tiles.createSmallMap(tilemap`level5`),
tiles.createSmallMap(tilemap`level6`),
tiles.createSmallMap(tilemap`level7`),
tiles.createSmallMap(tilemap`level8`),
tiles.createSmallMap(tilemap`level9`),
tiles.createSmallMap(tilemap`level10`),
tiles.createSmallMap(tilemap`level11`),
tiles.createSmallMap(tilemap`level12`),
tiles.createSmallMap(tilemap`level13`),
tiles.createSmallMap(tilemap`level14`),
tiles.createSmallMap(tilemap`level15`),
tiles.createSmallMap(tilemap`level16`),
tiles.createSmallMap(tilemap`level17`),
tiles.createSmallMap(tilemap`level18`),
tiles.createSmallMap(tilemap`level19`),
tiles.createSmallMap(tilemap`level20`),
tiles.createSmallMap(tilemap`level21`),
tiles.createSmallMap(tilemap`level22`),
tiles.createSmallMap(tilemap`level23`),
tiles.createSmallMap(tilemap`level24`),
tiles.createSmallMap(tilemap`level25`),
tiles.createSmallMap(tilemap`level26`),
tiles.createSmallMap(tilemap`level27`),
tiles.createSmallMap(tilemap`level28`),
tiles.createSmallMap(tilemap`level29`),
tiles.createSmallMap(tilemap`level30`),
tiles.createSmallMap(tilemap`level31`),
tiles.createSmallMap(tilemap`level32`),
tiles.createSmallMap(tilemap`level33`)
]
let pars = [
3,
6,
5,
7,
3,
7,
5,
4,
5,
5,
4,
5,
6,
6,
11,
4,
10,
8,
5,
10,
5,
8,
11,
5,
11,
5,
8,
9,
7,
12,
13,
20
]
gameInit()
game.onUpdate(function () {
    gs += 0.001
    if (mode == "game") {
        updateballs()
        for (let h2 of holes) {
            h2.checkhole()
        }
        for (let w2 of water) {
            w2.checkwater()
        }
        for (let s2 of sand) {
            s2.checksand()
        }
        for (let sw2 of switches) {
            sw2.checkswitch()
        }
        opendoors()
        if (didwin()) {
            if (wt == 0) {
                wt = 90
            } else if (wt > 1) {
                wt += 0 - 1
            } else if (wt == 1) {
                if (scores[level] == 0) {
                    scores[level] = strokes
                    dSetLevelScore(level, strokes)
                } else {
                    if (strokes < scores[level]) {
                        scores[level] = strokes
                        dSetLevelScore(level, strokes)
                    }
                }
                restoremap()
                level += 1
                if (level > levelunlocked) {
                    levelunlocked = level
                    dSetMaxLevel(levelunlocked)
                }
                if (level == 32) {
                    mode = "win"
                    tiles.loadMap(tiles.createSmallMap(tilemap`level34`))
                } else {
                    loadlevel()
                }
            }
        }
    }
})
