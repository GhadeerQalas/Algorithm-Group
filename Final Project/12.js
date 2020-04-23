// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - Final Project
// 2019, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge member fields and methods to be added later as needed
//


var _v = [], _e = [];   // note naming conventions in upload guide


// -----------------------------------------------------------------------
function _main()
{

var heap = new Heap();
    //operation sequence from the Figure :
    var ListOfSequence = [
		{KEY: 2, Vlaue: "a"},
		{KEY: 9, Vlaue: "b"},
		{KEY: 7, Vlaue: "c"},
		{KEY: 6, Vlaue: "d"},
		{KEY: 5, Vlaue: "e"},
		{KEY: 8, Vlaue: "f"}];

	for (var i = 0; i < ListOfSequence.length; i++) {
		heap.insert(ListOfSequence[i].KEY , ListOfSequence[i].Vlaue);
	}
    document.write(heap.show());
    heap.insert(10, "g");
    document.write(heap.show());
    heap.insert(15, "h");
    document.write(heap.show());


   // set input graph properties then implement the graph
    var g = new Graph();
    g.label = "Exercise 9.2: 1b (Levitin, 3rd edition)";
    g.readGraph(_v, _e);
    g.printGraph();




//-------------------print output of first prim------------------------------------------------

    document.write('<br>MST by first Prim<br>');

    g.primImpl1();
    for (var i = 0; i < g.Prim_Edge.length; i++) {
        document.write("(", g.Prim_Edge[i].v, ",", g.Prim_Edge[i].u, ")");
 	g.Prim_Edge.length-1 == i ? document.write(".<p>") : document.write(", ");
}

//-------------------print output of second prim---------------------------------------

document.write("<br>MST by Prim2 (PQ-Heap): <br>");
    g.primImpl2();

    for (var n = 0; n < g.verticesTree.length; n++) {
        if (g.verticesTree[n].parent != null) {
            document.write("(", g.verticesTree[n].parent, ",", g.verticesTree[n].V, ")");
            g.Prim_Edge.length-1 == i ? document.write(".<p>") : document.write(", ");
        } else if (g.verticesTree[n].parent == null) {
            document.write("(-, ", g.verticesTree[n].tree, "), ");
        }
    }

}
// -----------------------------------------------------------------------
// similar to starter 8
function Vertex(v)
{

// published docs section (ref. assignment page)
	// for this section, strip line comments
	// no JSDOC comments in this section

// base property fields
	this.label = v.label;				// vertex can be labelled
	this.visit = false; 				// vertex can be marked visited or "seen"
    this.adjacent = new List();				// init an adjacency list

	// base member methods
	this.adjacentByID = adjacentByIdImpl; 		// Get id of adjacent vertices in an array.
    this.incidentEdges = incidentEdgesImpl;		// return target id of incident edges in array
    this.vertexInfo = vertexInfoImpl;			// Get vertex details in a printable string
    this.insertAdjacent = insertAdjacentImpl;	// Insert a new edge node in the adjacency list of vertex.


}

// -----------------------------------------------------------------------
// similar to starter 8
function Edge(vert_i,weight)
{

	// published docs section (ref. assignment page)
	// for this section, strip line comments
	// no JSDOC comments in this section


	// base property fields
   	 this.target_v = vert_i;		//Id of edge target vertex
   	 this.weight = weight;


}


// -----------------------------------------------------------------------
// similar to starter 8 (NO network methods)
function Graph()
{

// published docs section (ref. assignment page)
	// for this section, strip line comments
	// no JSDOC comments in this section


	// base property fields

    this.vert = [];					// vertex list (an array of Vertex objects)
    this.nv = 0;					// number of vertices
    this.ne = 0;					// number of edges
    this.digraph = false;				// true if digraph, false otherwise (default undirected)
    this.weighted = false;				// true if weighted graph, false otherwise (default unweighted)
    this.label = "";					// identification string to label graph
    this.connectedComp = 0;				// number of connected comps set by DFS; 0 (default) for no info
    this.verticesTree = [];
    this.Prim_Edge = [];

    // base member methods
    this.listVerts = listVertsImpl;			// List graph vertices using info strings returned by Vertex methods
    this.readGraph = better_input;			// default input reader method
    this.addEdge = addEdgeImpl;				// Insert an edge
    this.printGraph = printGraphImpl;			// better printer function
    this.isConnected = isConnectedImpl;			// Test if graph is connected returning true, otherwise false
    this.componentInfo = componentInfoImpl;		// Get printable connectivity info strings
    this.primImpl2 = primImpl2;
    this.primImpl1 = primImpl1;



}


// -----------------------------------------------------------------------
// functions used by methods of Graph and ancillary objects


function make_graphImpl(n, m, w)   // feel free to change, if needed
{
    // parameter validations and checks: number of edges etc.
	var mmax = n*(n-1);
	if ( ! this.digraph ) mmax /= 2;
	if (m>mmax)
	{
		document.write("<p>ERROR: invalid number of edges for graph type</p>");
		return;
	}

	// create n vertex in v[] using id 0 to n-1 as label
	var v=[];
	for (var i=0; i<n; i++)
		v[i] = {label:i.toString()};

	// if graph complete no need to generate random edges, just create mmax edges systematically


	// otherwise repreat create m distinct edges (graph loops not allowed)

	var e=[], wmin=1, wmax = 50000, wsum=0;

	var h = [];   // quick-dirty n x n matrix to check previously generated edges,
	              // m-entry hash table would be more efficient
	for (i=0; i<n; i++)
	{
		h[i] = []; h[i][i]=0;    // no graph loops; 0 = blocked pair of vertices
	}

	for (i=0; i<m; i++)
	{
		// generate vertices u, v randomly
		do
		{
			var u_i = random(0,n-1), v_i = random(0,n-1);

		} while ( h[u_i][v_i] != undefined );

		h[u_i][v_i] = 0; h[v_i][u_i] = 0;     // update matrix: block u,v; block v,u also if undirected

		// if (u,v) is distinct insert in e[] (generate random weight if w true)
		// otherwise repeat generate another u,v pair

		e[i] = {u:u_i, v:v_i};
		if (w)
		{
			e[i].w = random(wmin,wmax);
			wsum += e[i].w;
		}
	}

	// call graph reader method and set label, graph type depends on value of digraph property
	this.read_graph(v,e);
	this.label = "Generated "+n+" vertices, "+m+" random "+(!this.digraph?"un":"")+"directed edges ("+Math.round(m/mmax*100)+"%)"+(w?", ave weight = "+Math.round(wsum/m):"");
}

function random(low,high)
{
	return Math.floor(Math.random()*(high-low+1))+low;
}


// -----------------------------------------------------------------------
// begin student code section (NO network functions, only code related to this project)
// -----------------------------------------------------------------------

// Final M2 code here
// -----------------------------------------------------------------------
// paste your heap package here


function Heap()
{
	// h[0] not used, heap initially empty

	this.h = [null];                   // heap of integer keys
	this.h_item = [null];              // corresponding heap of data-items (any object)
	this.size = 0;                     // 1 smaller than array (also index of last child)


	// --------------------
	// PQ-required only; more could be added later when needed
	// the 2 basic shape maintaining operations heapify and reheapify simplify
	// processing functions

	this.isEmpty = heapisEmpty;                    // return true if heap empty
	this.deleteRoot = heapDeleteRoot;              // return data-item in root
	this.insert = heapInsert;                      // insert data-item with key

	this.heapify = heapheapify;                    // make subtree heap; top-down heapify ("sink") used by .deleteRoot()
	this.reheapify = heapreheapify;                // bottom-up reheapify ("swim") used by .insert()
	this.show = heapShow;             	       // utility: return pretty formatted heap as string
	                                     	       // ... etc

	// --------------------
}

// -----------------------------------------------------------------------
function heapShow()
{
	var n = this.size;
	var m = Math.floor(n/2);       // last parent node

	var k = this.h.slice(1,n+1), a = this.h_item.slice(1,n+1);

	var out="<h2>Heap (size="+ n+ "):</h2><p>Keys: " + k + "<br>Data: "+ a + "</p>";
	for (var i=1; i<=m; i++)
	{
		out += "<p>"+ i+ ": <b>"+ this.h[i]+ "("+ this.h_item[i]+ ")</b><ul>";
		if ( 2*i <= n )
			out += "<li>"+ this.h[2*i]+ "</li>";
		if ( 2*i+1 <= n )
			out+= "<li>"+ this.h[2*i+1]+ "</li>";
		out+= "</ul></p>";
	}

	return out;
}

// etc.
//-----------------------------------------
function heapDeleteRoot()
{
	if (this.isEmpty()) {
        return "The heap is empty";
    	}
	// save root key and item pair
	else
	var root = [ this.h[1], this.h_item[1] ];

	// ... complete
	this.h_item[1] = this.h_item[this.size];

        this.h[1] = this.h[this.size];
        this.heapify(1);
        //decrease the heap size since we delete from it
        this.size -= 1;

	return root;
}
//-----------------------------------------
function heapInsert(key, item) {

    //increase the size of the heap to insert
    this.size += 1;

    this.h[this.size] = key;

    this.h_item[this.size] = item;

    // reheapify the heap after we insert to maintain it
    this.reheapify();
}

//-----------------------------------------
function heapisEmpty() {
    return this.size == 0 ? true : false;
}

//-----------------------------------------

function heapheapify(key) {


    //Left childs index
    var leftChild = 2 * key;

    //Right childs index
    var rightChild = 2 * key + 1;

    // make the parent as the large one
    var large = key;

    if (leftChild < this.size && this.h[leftChild] > this.h[large]) {
        large = leftChild;
    }

    else {
        large = key;
    }

    if (rightChild < this.size && this.h[rightChild] > this.h[large]) {
        large = rightChild;
    }

    // swap if you find the child has larger value
    if (large != key) {
        var itemTemp = this.h_item[key];
        this.h_item[key] = this.h_item[large];
        this.h_item[large] = itemTemp;

        var temp = this.h[key];
        this.h[key] = this.h[large];
        this.h[large] = temp;

        this.heapify(large);
    }
}

//-----------------------------------------

function heapreheapify() {

    //Get the heap size
    var n = this.size;

    //Get the last parent node
    var m = Math.floor(n/2);

    for (var i = m; i >= 1; i--) {
        var key = i;
        var v = this.h[key];
        var v2 = this.h_item[key];
        var heap = false;

        while (!heap && 2 * key <= n) {
            var j = 2 * key;
            if (j < n) {
                if (this.h[j] < this.h[j + 1]) {
                    j += 1;
                }
            }


        if (v >= this.h[j]) {
                heap = true;
             }
	else {
                this.h_item[key] = this.h_item[j];
                this.h[key] = this.h[j];
                key = j;
            }

            this.h[key] = v;
            this.h_item[key] = v2;
        }
    }
}

//-----------------------------------------




// -----------------------------------------------------------------------
// paste your PQ package here (version with calls to heap methods only)


function PQueue() {

	this.pq = new Heap();          // requirement: Heap implementation


	// specify (design) methods

	/**
      Return true if queue empty
      @method
    */
	this.isEmpty = isEmptyImpl;


	/**
      Remove/Return item with minimum priority
      @method
     */
	this.deleteMin = deleteMinImpl;


	/**
      Insert/Update an item with priority
      @method
     */
	this.insert = insertImpl;
}

// -----------------------------------------------------------------------
// Priority queue node constructor (document using JSDOC comments)

/**
   Create a new PQ node with two parameters item and its priority key
   @author Reem Khalil
   @constructor
   @param {integer} item Data item value (vertex id)
   @param {integer} key Priority key value
*/

function PQNode(item, key)
{
	/**
      The value of Data item
    */
	this.item = item;

	/**
      The value of priority
    */
	this.prior = key;

	// specify (design) methods
}

// -----------------------------------------------------------------------
// functions used by PQueue() object methods
// specify interface information (JSDOC comments)
// function names should not clash with linklist.js and queue.js
// ....


/**
   Return true if the queue is empty otherwise return false.
   @author Reem Khalil
   @implements PQueue#isEmpty
   @returns {boolean} True if PQ is empty
*/

function isEmptyImpl()
{
	return this.pq.isEmpty();
}

//-------------------------------------------------------------------------


/**
   Remove the item with the min priority from the PQueue and return it's data item .
   @author Reem Khalil
   @implements PQueue#deleteMin
   @return {integer} The data item of deleted item with the min priority
*/

function deleteMinImpl() {

    var deletedItem = this.pq.deleteRoot();
    deletedItem[0] = deletedItem[0] * -1;
    return deletedItem;
}

//-------------------------------------------------------------------------

/**
   Insert a new item into the PQueue or update an item with new priority if the new key smaller than the current key.
   @author Reem Khalil
   @implements PQueue#insert
   @param {ineger} item Data item to be inserted in the PQ (vertex id)
   @param {integer} key Priority key value
*/

function insertImpl(key, item) {
    return this.pq.insert(key * -1, item);

}

// -----------------------------------------------------------------------




// -----------------------------------------------------------------------
// published docs section (ref. assignment page)
// similar to starters 8 and 11
// *NO* JSDOC comments in this section
// -----------------------------------------------------------------------

function listVertsImpl()
{
    var i, v; // local variables
    for (var i = 0; i < this.nv; i++)
    {
        v = this.vert[i];
        document.write("VERTEX: ", i, v.vertexInfo(), "<br>");
    }
}


// --------------------
function componentInfoImpl()
{
    var out;
    switch (this.connectedComp)
    {
        case 0:
            out = "no connectivity info";
            break;
        case 1:
            out = "CONNECTED";
            break;
        default:
            out = "DISCONNECTED " + this.connectedComp;
            break;
    }
    return out;
}

// --------------------
function printGraphImpl()
{
    document.write("<p>GRAPH {", this.label, "} ", this.weighted ? "" : "UN", "WEIGHTED, ", this.digraph ? "" : "UN", "DIRECTED - ",
        this.nv, " VERTICES, ", this.ne, " EDGES:</p>", this.componentInfo(), "</p>");

    // list vertices
    this.listVerts();
}

// --------------------

function vertexInfoImpl()
{
    return " {" + this.label + "} - VISIT: " + this.visit + " - ADJACENCY: " + this.adjacentByID();
}

// --------------------
function incidentEdgesImpl()
{
    //array of objects
    var enode = [];
    var w = this.adjacent.traverse();
    for (var i = 0; i < w.length; i++)
    {
        enode[i] = {
            "adjVert_i": w[i].target_v,
            "edgeLabel": "",
            "edgeWeight": w[i].weight
        }
    }
    return enode;
}

// --------------------
function insertAdjacentImpl(v_i, weight)
{
    this.adjacent.insert(new Edge(v_i, weight));
}

// --------------------

function addEdgeImpl(u_i, v_i, weight) {

    //fetch vertices using their idm where u: edge source vertex, v: target vertex
    var u = this.vert[u_i];
    var v = this.vert[v_i];

    //insert (u,v), i.e. insert v (by id) in adjacency list of u
    u.insertAdjacent(v_i, weight);

    // insert (v,u) if undirected graph (repeat above but reverse vertex order)
    if (!this.digraph) {
        v.insertAdjacent(u_i, weight);
    }
}

// --------------------
function isConnectedImpl()
{
    return this.connectedComp == 0 ? true : false;
}

// --------------------

function adjacentByIdImpl()
{
    var adjacentArr = [];
    var adjacency_list = this.adjacent.traverse();
    for (var i = 0; i < adjacency_list.length; i++)
    {
        adjacentArr[i] = adjacency_list[i].target_v;
    }
    return adjacentArr;
}

// --------------------
function better_input(v, e)
{
    // set number of vertices and edges fields
    this.nv = v.length;
    this.ne = e.length;
    // input vertices into internal vertex array
    for (var i = 0; i < this.nv; i++)
    {
        this.vert[i] = new Vertex(v[i]);
    }
    // input vertex pairs from edge list input array
    // remember to pass vertex ids to add_edge()
    for (var i = 0; i < this.ne; i++)
    {
        this.addEdge(e[i].u, e[i].v, e[i].w);
    }
    // double edge count if graph undirected
    if (!this.digraph)
    {
        this.ne = e.length * 2;
    }
    // check if the graph is weighted or not
    if (!(e[0].w == undefined))
    {
        this.weighted = true;
    }
}

// --------------------------------------------------prim1---------------------------------------
/**
 * Represents a function
 * @implement this function find the minimum spanning tree of the edges between vertices
 * @author Arwa Alahmadi
 * @function PrimImpl
 * @type void
 */
function primImpl1()
{
    // create nodes
    var n;
    // create vertices tree
    var verticesTree = [];

    // in this loop we should make all vertex unvisited
   // we will use variable un means unvisited
    for (var un = 0; un < this.nv; un++)
    {
        this.vert[un].visit = false;
    }

    // inatiat first index with first value on vert array
    verticesTree[0] = 0;
    this.vert[0].visit = true;

this.Prim_Edge[0] = {
        v: "-",
        u: verticesTree[0],
        w: "-"
    };

    var min = Infinity; // any number would be less than infinty

    for (var i = 0; i < this.nv; i++)
    {
        //get fringe vertices of the current vertext
        for (var j = 0; j < verticesTree.length; j++)
        {
            //get fringe vertices of the current vertext
	    var incident_Edge = this.vert[verticesTree[j]].incidentEdges();
            //loop on every fringe vertex
            for (var k = 0; k < incident_Edge.length; k++)
            {
                //check every unvisited vertex to check if it can be visited in a shorter distance
                if ((!this.vert[incident_Edge[k].adjVert_i].visit) && (incident_Edge[k].edgeWeight < min))
                {
                    this.Prim_Edge[i] =
                        (
                        {
                            v: verticesTree[j],
                            u: incident_Edge[k].adjVert_i,
                            w: incident_Edge[k].edgeWeight
                        });
                    //set the new weight as the minimum
                    min = this.Prim_Edge[i].w;
                }
            }
        }
        n = this.Prim_Edge.length;
        verticesTree[verticesTree.length] = this.Prim_Edge[n - 1].u;

        // mark VerticesTree as visited
        this.vert[this.Prim_Edge[n - 1].u].visit = true;

        min = Infinity;
    }
}


//----------------------------------prim2-------------------------------------------
/**
 * Prim's algorithm using PQ based on Heap
 *
   @author Arwa alahmadi
   @implements Graph#primImpl2
   @function
   @param {integer} s the source vertex
*/

function primImpl2(){

   //check if the graph is weighted to be sure that there is MST
 if(this.weighted){

    //craete the queue
    var pq = new PQueue();

    // create the penulimate array
    var penultimate;

    // create array have all weights of edges
    var weight = [];

    //Initialize vertices Tree
    this.verticesTree=[];


    for (var j = 0; j < this.nv; j++)
    {
	// mark all vertices unvisited and if penulimate array equal '-'
        this.vert[j].visit = false;

    	// set all the weight array by infinity.
        weight[j] = Infinity;
    }

    // edges array contains all the edges (v,u)
    var edges =this.vert[0].incidentEdges();

    for(var i=0;i<edges.length;i++){

        //insert dest. vertex and weight of edge in the queue.
        pq.insert(edges[i].edgeWeight, edges[i].adjVert_i);

        //add weight of edge to weight array.
        weight[edges[i].adjVert_i] = edges[i].edgeWeight;
    }

    //mark the vertex as true
    this.vert[0].visit = true;

    //intitalize verticesTree by the first vertex
    this.verticesTree[0] = {
        V: 0,
        parent: "-"
    };

while (!pq.isEmpty()) {
        u = pq.deleteMin();

        //edges array contains all the edges (v,u)
        var edges = this.vert[u[1]].incidentEdges();

        for (var i = 0; i < edges.length; i++) {
            if (this.vert[edges[i].adjVert_i].visit) {
                if (edges[i].edgeWeight == u[0]) {
                    parent = edges[i].adjVert_i;
                    break;
                }
            }
        }
        //Update The vertex tree
        if (!this.vert[u[1]].visit) {
            this.verticesTree[this.verticesTree.length] = {
                V: u[1],
                parent: parent
            };
            this.vert[u[1]].visit = true;

            //update the priority queue
            for (var i = 0; i < edges.length; i++) {
                if (!this.vert[edges[i].adjVert_i].visit) {
                    pq.insert(edges[i].edgeWeight, edges[i].adjVert_i);
                }
            }
        }
    }
}
    return this.verticesTree;
}

// -----------------------------------------------------------------------
