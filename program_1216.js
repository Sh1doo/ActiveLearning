class Task {
    /** タスク
     * 
     * @param {*} prepareName 準備の名前
     * @param {*} workName 作業の名前
     * @param {*} prepare 準備時間
     * @param {*} work 作業時間
     */
    constructor(prepareName, workName, prepare, work) {
        this.prepareName = prepareName;
        this.workName = workName;
        this.prepare = prepare;
        this.work = work;
    }
}

const INF = 1000000000;

/** 最も大きい合計作業時間を返す
 * 
 * @param {number} times 各作業員の合計作業時間についての配列
 * @returns 最も大きい合計作業時間
 */
function maxElementOfTimeWorker(times) {
    let max = -1;
    for (let time of times) {
        max = Math.max(time, max);
    }
    return max;
}

/** 最も少ない作業時間の作業員を求める
 * 
 * @param {number} times 各作業員の合計作業時間についての配列
 * @returns 合計作業時間が最も小さい作業員の作業員番号
 */
function minWorker(times) {
    //作業員が一人の場合
    if (times.length == 1) return 0;

    const INF = 1000000000;
    let min = INF;
    let ret = -1;
    for (let i = 1; i < times.length; i++) {
        if (min > times[i]) {
            min = times[i];
            ret = i;
        }
    }
    return ret;
}

function main() {
    const svg = d3.select("#arrowDiagram");
    //svg = selection.remove();
    /** 矢印を描画する関数
     * 
     * @param {number} startX 開始地点(x)
     * @param {number} startY 開始地点(y)
     * @param {number} endX 終了地点(x)
     * @param {number} endY 終了地点(y)
     * @param {boolean} isWork - 準備の場合は true（青色の矢印）、作業の場合は false（赤色の矢印）
     */
    function drawArrow(startX, startY, endX, endY, isWork) {
	const arrowColor = isWork ? "blue" : "red";

        svg.append("line")
            .attr("x1", startX)
            .attr("y1", startY)
            .attr("x2", endX)
            .attr("y2", endY)
            .attr("stroke", arrowColor)
            .attr("marker-end", "url(#arrowhead)");
    }

    /** 作業名を描画する関数
     * 
     * @param {*} startX 開始地点(x)
     * @param {*} startY 開始地点(y)
     * @param {*} endX 終了地点(x)
     * @param {*} taskName 作業の名前
     */
    function drawName(startX, startY, endX, taskName,duration) {
        //作業時間実質0の場合
        if(startX == endX) return;

        svg.append("text")
            .attr("x", (startX + endX) / 2)
            .attr("y", startY - 5)
            .text(taskName)
            .attr("text-anchor", "middle");
        svg.append("text")
            .attr("x", (startX + endX) / 2)
            .attr("y", startY + 15)
            .text(duration)
            .attr("text-anchor", "middle");
    }

   
    

    // 矢印の先端を定義
    svg.append("defs").append("marker")
        .attr("id", "arrowhead")
        .attr("refX", 6)
        .attr("refY", 3)
        .attr("markerWidth", 10)
        .attr("markerHeight", 7)
        .attr("orient", "auto")
        .append("polygon")
        .attr("points", "0 0, 10 3.5, 0 7");

    /*let tasks = [
		new Task("(a)中組", "(a)中組", 60, 10),
		new Task("(b)P挿し", "(b)P供給", 45, 17),
		new Task("(c)挿入かぶせ", "(c)挿入かぶせ", 50, 26),
		new Task("(d)締鋲", "(d)締鋲", 15, 21),
		new Task("(e)プルーフ", "(e)プルーフ", 10, 15),
		new Task("(f)切断", "(f)切断", 20, 7),
		new Task("(g)割ピン開口", "(g)割ピン開口", 20, 27),
		new Task("(h)甲板", "(h)甲板", 0, 12),
		new Task("(i)測長", "(i)測長", 0, 5)
    ];*/

    let k = 0;
    if(time1.length >= time2.length){
        k = time1.length;
    }else{
        k = time2.length;
    }

    

    let tasks =[];

    for(let i = 0; i < k; i++){
        if(time1.length < i+1){
            tasks[i]= new Task(value2[i],value2[i],0, time2[i]);
        }else if(time2.length < i+1){
            tasks[i] = new Task(value1[i],value1[i],time1[i], 0);
        }else{
            tasks[i] = new Task(value1[i],value2[i],time1[i], time2[i]);
        }
    }

    var ninzu = document.getElementById("number").value;

    let n = parseInt(ninzu,10);
    /*let n = parseInt(prompt("作業人数を入力してください"));*/
    let timeWorker = new Array(n).fill(0);


    AddTimeWorker(0, tasks[0].prepare, tasks[0].prepareName);
    AddTimeWorkerWithOffset(0, tasks[0].prepare, tasks[0].work, tasks[0].workName);

    /** TimeWorkerの変更と矢印の描画を行う
     * 
     * @param {number} worker 作業員番号
     * @param {number} start 初期時間
     * @param {number} time 加算する時間
     * @param {number} taskName 作業の名前
     */

    for (let i = 1; i < tasks.length; i++) {
        AddTimeWorker(minWorker(timeWorker), tasks[i].prepare, tasks[i].prepareName);
        AddTimeWorkerWithOffset(0, Math.max(timeWorker[0], maxElementOfTimeWorker(timeWorker)), tasks[i].work, tasks[i].workName);
    }

    /** フォーマット通りに矢印を描画する関数
     * 
     * @param {number} startTime 矢印の始点（タスクの開始時間） 
     * @param {number} duration 矢印の長さ（タスクの継続時間）
     * @param {number} person 作業員番号
     * @param {number} taskName 作業の名前
     */
    function drawArrowComplete(startTime, duration, person, taskName, isWork) {
        /**幅拡大率*/
        var widthScale = 8;
        /**上マージン*/
        var upperMargin = 50;
        /**矢印間の広さ*/
        var heightScale = 100;

        drawArrow(startTime * widthScale, upperMargin + person * heightScale, (startTime + duration) * widthScale, upperMargin + person * heightScale, isWork);
        drawName(startTime * widthScale, upperMargin + person * heightScale, (startTime + duration) * widthScale, taskName, duration);
       
      
    }

    /** TimeWorkerの加算と矢印の描画を行う
     * 
     * @param {number} worker 作業員番号
     * @param {number} time 加算する時間
    */

    function AddTimeWorker(worker, time, taskName) {
        drawArrowComplete(timeWorker[worker], time, worker, taskName, true);
        timeWorker[worker] += time;
    }

    /** TimeWorkerの変更と矢印の描画を行う
     * 
     * @param {number} worker 作業員番号
     * @param {number} start 初期時間
     * @param {number} time 加算する時間
     * @param {number} taskName 作業の名前
     */
    function AddTimeWorkerWithOffset(worker, start, time, taskName) {
        drawArrowComplete(start, time, worker, taskName, false);
        timeWorker[worker] = start + time;
    }
}
