// CPCS 324 Algorithms & Data Structures 2
// Reference starter - Basic Flow Network Package
// 2019, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// a maximum flow implementation based on simple graph object with
// minimal linked-list edge implementation and fields
//


var _v = [], _e = [],
   _v2 = [], _e2 = [];   // note naming conventions in upload guide


// -----------------------------------------------------------------------
function main_graph()
{
	// create flow network object
	var fn1 = new FNetwork();
    fn1.fn.label = "Figure 10.4 (Levitin, 3rd edition)";

	// read vertices and edges of flow network
    fn1.readNetwork(_v, _e);

    // print graph
    fn1.fn.printGraph();

    // print flow network
    fn1.printNetwork();

    // apply Edmonds-Karp mehtod on flow network
    fn1.edmondsKarp();
    document.write("<br>Num paths: ", fn1.numOfPaths, "<br><br>");

    // print after calling Edmonds-Karp mehtod
    fn1.printNetwork();
    document.write("<br><br>");

    /////////////////
    // create flow network object
	var fn2 = new FNetwork();
    fn2.fn.label = "Exercise 10.2: 2a (Levitin, 3rd edition)";

    // read vertices and edges of flow network
    fn2.readNetwork(_v2, _e2);

    // print graph
    fn2.fn.printGraph();

    // apply Edmonds-Karp mehtod on flow network
    fn2.edmondsKarp();
    document.write("<br>Num paths: ", fn2.numOfPaths, "<br><br>");

    // print after calling Edmonds-Karp mehtod
    fn2.printNetwork();
    document.write("<br><br>");
}


// -----------------------------------------------------------------------
// network object initial requirements: support Edmonds-Karp maximum flow algorithm

function FNetwork()
{

	// --------------------
	// student property fields next

    /**
	  create flow network graph
    */
   this.fn = new Graph();

   /**
     marking unlabeled vertex with 2 labels
   */
   this.vertLabel = [];
   /**
     flow network is directed
   */
   this.fn.digraph = true;

   /**
     flow network is weighted
   */
   this.fn.weighted = true;

   /**
     Number of paths
   */
   this.numOfPaths = 0;

	// --------------------
    // student member methods next


	// note following are required method names, you are not required to use all of them
	// you are required to use the name if you choose to have the method

	// accessor methods: getters

	this.edgeFlow=edgeFlowImpl;                // return (get) flow for argument edge i,j
	this.edgeCap=edgeCapImpl;                  // return capacity for argument edge i,j
	this.srcVertex=srcVertexImpl;              // return source vertex (or its id, you decide)
	this.sinkVertex=sinkVertexImpl;            // return sink vertex (or its id, you decide)
	this.getFlowVal=getFlowValImpl;            // return current flow *value* in network
	this.getFlow=getFlowImpl;                  // return current flow as array of {u,v,flow} objects
	this.inFlow=inFlowImpl;                    // return incoming flow for argument vertex
	this.outFlow=outFlowImpl;                  // return outgoing flow for argument vertex

	// accessor methods: setters
	this.setEdgeFlow=setEdgeFlowImpl;          // set flow on argument edge (i,j)
	this.setFlow=setFlowImpl;                  // set flow to argument (including 0) for all edges
	this.initFlow=initFlowImpl;                // reset flow to 0 for all edges
	this.setLabel=setLabelImpl;                // set network label (hide Graph code)


	// other possibly useful method names
	this.isSrc=isSrcImpl;                      // true if argument is source vertex of network
	this.isSink=isSinkImpl;                    // true if argument is sink vertex of network
	this.isEdge=isEdgeImpl;                    // true if argument vertices form an edge ALERT belong to Graph() but leave as test to students
	this.isBackwardEdge=isBackwardEdgeImpl;    // true if argument vertices form a backward edge
	this.readNetwork=readNetworkImpl;          // input reader method
	this.printNetwork=printNetworkImpl;        // output network including current flow (reference output of final project
	this.edmondsKarp=edmondsKarpImpl;          // implement the Edmonds-Karp algorithm for maximum flow

}

// -----------------------------------------------------------------------
// similar to starter 8
function Vertex(v)
{
	// base property fields
    this.label = v.label;
    this.label1;
    this.label2;


	// --------------------
	// more student fields next
	this.visit = false;
    this.adjacent = new List();


	// --------------------
	// more student methods next
	this.adjacentById = adjacentByIdImpl;
    this.incidentEdges = incidentEdgesImpl;
    this.insertAdjacent = insertAdjacentImpl;
    this.vertexInfo = vertexInfoImpl;
}

// -----------------------------------------------------------------------
// similar to starter 8
function Edge(vert_i,weight)
{
	// base property fields
	this.target_v = vert_i;


	// --------------------
	// more student fields next
	if (!(weight === undefined))
    {
        this.weight = weight;
    }
    else
    {
        this.weight = null;
    }

    this.flow = 0 ;
}


// -----------------------------------------------------------------------
// similar to starter 8
function Graph()
{
	// base property fields

  	this.vert = [];
	  this.nv = 0;
    this.ne = 0;
    this.digraph = false;
    this.dfs_push = [];
    this.bfs_order = [];
    this.label = "";


	// base member methods

	  this.listVerts = listVertsImpl;
    this.readGraph = better_input;
    this.add_edge = addEdgeImpl3;
    this.printGraph = printGraphImpl;
    this.dfs = dfsImpl;
    this.bfs = bfsImpl;

	// more student fields next

	  this.weighted = false;
    this.connectedComp = 0;
    this.adjMatrix = [];
    this.VT = [];


	// --------------------
	// more student methods next
    this.makeGraph = makeGraphImpl;
    this.makeAdjMatrix = makeAdjMatrixImpl3;
    this.isConnected = isConnectedImpl;
    this.componentInfo = componentInfoImpl;
    this.topoSearch = topoSearchImpl;

}


// -----------------------------------------------------------------------
// functions used by methods of Graph and ancillary objects

// -----------------------------------------------------------------------
// begin student code section
// -----------------------------------------------------------------------

// REMOVE transitive closure/greedy packages and related methods in Graph to prevent errors

/**
   Return (get) flow for argument edge i,j
   @author Elham Saleem
   @implements FNetwork#edgeFlow
   @param {ineger} i vertex id
   @param {integer} j vertex id
   @return {integer} flow for argument edge i,j
*/

function edgeFlowImpl(i, j)
{
    var vertexi = this.fn.vert[i];
    var adjacent2 = vertexi.adjacent.traverse();
    for (var i = 0; i < adjacent2.length; i++){
         if(adjacent2[i].target_v == j){
             return adjacent2[i].flow;
         }
    }

}

/**
   Return capacity for argument edge i,j
   @author Elham Saleem
   @implements FNetwork#edgeCap
   @param {ineger} i vertex id
   @param {integer} j vertex id
   @return {integer} capacity for argument edge i,j
*/

function edgeCapImpl(i, j)
{
    var vertexi = this.fn.vert[i];
    var adjacent2 = vertexi.adjacent.traverse();
    for (var i = 0; i < adjacent2.length; i++)
    {
         if(adjacent2[i].target_v == j)
         {
             return adjacent2[i].weight;
         }
    }
}

/**
   True if argument vertices form an edge
   @author Ghadeer Qalas
   @implements FNetwork#isEdge
   @return {boolean} true if the two vertices are form an edge
*/

function isEdgeImpl(i, j)
{
    return this.fn.adjMatrix[i][j] != 0;
}

/**
   True if argument vertices form a backward edge.
   @author Elham Saleem
   @implements FNetwork#isBackwardEdge
   @param {ineger} i vertex id
   @param {integer} j vertex id
   @return {boolean} true if the edge is a backward
*/

function isBackwardEdgeImpl(i, j)
{
    return this.fn.adjMatrix[j][i] != 0;
}

/**
   Method for read the input
   @author Elham Saleem
   @implements FNetwork #readNetwork
   @param {Array} v set of vertices
   @param {Array} e set of edges
*/

function readNetworkImpl(v, e)
{
    this.fn.readGraph(v, e);
    this.fn.makeAdjMatrix();
}


function printNetworkImpl()
{
    for (var i = 0; i < this.fn.nv; i++)
    {
        var vertex = this.fn.vert[i];
        var adjacent2 = vertex.adjacent.traverse();
        document.write(i, " {", vertex.label, "}");
        for (var j = 0; j < adjacent2.length; j++)
        {
            document.write(" ", i,"-", adjacent2[j].target_v," ",
            adjacent2[j].weight," ", adjacent2[j].flow);
            document.write( j == adjacent2.length - 1 ? "" : ",");
        }
        document.write("<br>");
    }
}

/**
   Return source vertex
   @author Elham Saleem
   @implements FNetwork#srcVertex
*/
function srcVertexImpl()
{
    return 0;
}

/**
   Return source vertex
   @author Elham Saleem
   @implements FNetwork#sinkVertex
*/
function sinkVertexImpl()
{
    return this.fn.nv -1;
}

/**
   return current flow *value* in network
   @author
   @implements FNetwork#getFlowVal
   @param
*/
function getFlowValImpl()
{}

/**
   return current flow as array of {u,v,flow} objects

   @author
   @implements FNetwork#getFlow
   @param
*/
function getFlowImpl()
{}

/**
   return incoming flow for argument vertex

   @author
   @implements FNetwork#inFlow
   @param
*/
function inFlowImpl()
{}

/**
   return outgoing flow for argument vertex

   @author
   @implements FNetwork#outFlow
   @param
*/
function outFlowImpl()
{}

/**
   set network label (hide Graph code)
   @author Elham Saleem
   @implements FNetwork#setLabel
   @param {integer} v vertex id to set its label
   @param {integer} Label_1 first label
   @param {integer} Label_2 second label
*/
function setEdgeFlowImpl(i,j,x)
{
    var vertexi = this.fn.vert[i];
    var adjacent2 = vertexi.adjacent.traverse();
    for (var i = 0; i < adjacent2.length; i++){
        if (adjacent2[i].target_v == j){
            adjacent2[i].flow = x;
        }
    }
}

/**
   set flow to argument (including 0) for all edges

   @author
   @implements FNetwork#setFlow
   @param
*/
function setFlowImpl()
{}

/**
   reset flow to 0 for all edges

   @author Elahm Saleem
   @implements FNetwork#initFlow
*/
function initFlowImpl()
{
    for(var i=0; i<this.fn.nv ; i++){
        var edges = this.fn.vert[i].adjacent.traverse();
        for(var j=0; j<edges.length; j++){
            edges[j].flow = 0;
        }
    }
}

/**
   set network label (hide Graph code)
   @author Elham Saleem
   @implements FNetwork#setLabel
   @param {integer} vertex vertex id to set its label
   @param {integer} firstLabel
   @param {integer} secondLabel
*/
function setLabelImpl(vertex, firstLabel, secondLabel)
{
    this.vertLabel[vertex] = {
        label1: firstLabel,
        label2: secondLabel
    }
}

/**
   true if argument is source vertex of network

   @author
   @implements FNetwork#isSrc
   @param
*/
function isSrcImpl()
{}

/**
   true if argument is sink vertex of network

   @author
   @implements FNetwork#isSink
   @param
*/
function isSinkImpl()
{}


/**
   Implement the Edmonds-Karp max flow algorithm for maximum flow.
   @author Elham saleem & Ghadeer Qalas
   @implements FNetwork#edmondsKarp

*/

function edmondsKarpImpl()
{

    this.initFlow(); //initialize flow with 0
    var q = new Queue();
    var source = this.srcVertex();
    this.setLabel(source,Infinity,"-");

    q.enqueue(source);

    while(!q.isEmpty()){
        var i = q.dequeue();                //The first vertex id in the queue

        for(var j=0; j<this.fn.nv; j++){
            if(this.isEdge(i,j)){           //for every edge from i to j (forward edge)

                if(this.vertLabel[j] === undefined){
                    var r = this.edgeCap(i,j) - this.edgeFlow(i,j);     //compute residual value (capacity - flow)
                    if (r>0){                                           //If the residual is positive (we can augment this edge)
                        this.setLabel(j, Math.min(this.vertLabel[i].label1, r), i+1);
                        q.enqueue(j);
                    }
                }
            }
        }

        for(var j=0; j<this.fn.nv; j++)
        {    //for every backward edge from j to i
            if(this.isBackwardEdge(i,j))
            {
                if(this.vertLabel[j] === undefined)
                {
                    if(this.edgeFlow(j,i)>0)
                    {           //If there is a positive flow from j to i (we can decrement it later)
                        this.setLabel(j, Math.min(this.vertLabel[i].label1, this.edgeFlow(j,i)), -1*(i+1));
                        q.enqueue(j);

                      } // end if of edge fkow
                  } // end if of vert label
              } // end if of backward edge
          } // end for loop

          var sink = this.sinkVertex();
          if(!(this.vertLabel[sink] === undefined)) // check sink of vertex if labeled
  				{
  						this.numOfPaths = this.numOfPaths +1;  //counter for number of path
  						var j = sink+1;  // here we using the sink and  move backwards by second labels.
  							while(j != 1)
            {

                var parent = this.vertLabel[j - 1].label2;

                if (parent > 0)
                { //The second label of vertex j is positive
                    flowValue = this.edgeFlow(parent-1 ,j-1) + this.vertLabel[sink].label1;
                    this.setEdgeFlow(parent-1 ,j-1 , flowValue);
                }

                else
                {
                    parent = parent*-1;
                    flowValue = this.edgeFlow(j-1 ,parent-1) - this.vertLabel[sink].label1;
                    this.setEdgeFlow(j-1, parent-1, flowValue);
                } // end else
                j = parent;
            } // end while
           // remove all vertices of the labels except that has source
            this.vertLabel = [];
            this.setLabel(source, Infinity, "-");

            // rededine queue with the source
            q = new Queue();
            q.enqueue(source);

      	} // end if
    	} // end while loop
  } // end function edmondsKarpImpl

// -----------------------------------------------------------------------
// published docs section (ref. assignment page)
// similar to starter 8 (strip line comments, leave outline)
// no JSDOC comments in this section
// -----------------------------------------------------------------------

function addEdgeImpl(u_i, v_i)
{
    // fetch edge vertices using their id, where u: source vertex, v: target vertex
    var u = this.vert[u_i];
    var v = this.vert[v_i];


    // insert (u,v), i.e., insert v (by id) in adjacency list of u

    u.adjacent.insert(v_i);


    // insert (v,u) if undirected graph (repeat above but reverse vertex order)

    if (!this.digraph)
    {
        v.adjacent.insert(u_i);
    }
}

// -----------------------------------------------------------------------

function addEdgeImpl2(u_i, v_i, weight)
{
    // fetch vertices using their id, where u: edge source vertex, v: target vertex
    var u = this.vert[u_i];
    var v = this.vert[v_i];

    // insert (u,v), i.e., insert v in adjacency list of u
    // (first create edge object using v_i as target, then pass object)

    var v_edge = new Edge(v_i);

    if (!(weight === undefined))
    {

        v_edge.weight = weight;
    }

    u.adjacent.insert(v_edge);


    // insert (v,u) if undirected graph (repeat above but reverse vertex order)

    if (!this.digraph)
    {

        var u_edge = new Edge(u_i);


        if (!(weight === undefined))
        {

            u_edge.weight = weight;

        }

        v.adjacent.insert(u_edge);
    }

}

// -----------------------------------------------------------------------

function addEdgeImpl3(u_i, v_i, weight)
{
    // fetch vertices using their id, where u: edge source vertex, v: target vertex
    var u = this.vert[u_i];
    var v = this.vert[v_i];


    // insert (u,v), i.e., insert v in adjacency list of u
    // (first create edge object using v_i as target, then pass object)

    u.insertAdjacent(v_i, weight);


    // insert (v,u) if undirected graph (repeat above but reverse vertex order)

    if (!this.digraph)
    {

        v.insertAdjacent(u_i, weight);
    }
}

// -----------------

function printGraphImpl()
{
    document.write("GRAPH {", this.label, "} ", this.weighted ? "WEIGHTED, " : "", this.digraph ? "" : "UN", "DIRECTED - ", this.nv, " VERTICES, ", this.ne, " EDGES:");
    document.write('<br>');
}

// -------------------

function listVertsImpl()
{
    var i, v; // local vars
    for (i = 0; i < this.nv; i++)
    {
        v = this.vert[i];
        document.write("VERTEX: ", i, v.vertexInfo());
    }
}

// -------------------

function better_input(v, e)
{
    // set vertex and edge count fields
    this.nv = v.length;
    this.ne = e.length;

    // input vertices into internal vertex array
    for (var i = 0; i < this.nv; i++)
    {
        this.vert[i] = new Vertex(v[i]);
    }

    //check if the graph is weighted or not
    this.weighted = e[0].w === undefined ? false : true;

    // input vertex pairs from edge list input array
    // remember to pass vertex ids to add_edge()
    for (var i = 0; i < this.ne; i++)
    {
        this.add_edge(e[i].u, e[i].v, e[i].w);
    }

    // double edge count if graph undirected
    if (!this.digraph)
    {
        this.ne = e.length * 2;
    }
}

// -------------------

function better_output()
{
    document.write("<p>GRAPH {", this.label, "} ", this.weighted ? "WEIGHTED, " : "", this.digraph ? "" : "UN", "DIRECTED - ", this.nv, " VERTICES, ", this.ne, " EDGES:</p>");


	switch(this.connectedComp){
		case 0: document.write('<br> no connectivity info <br><br>');
		case 1: document.write('<br> CONNECTED <br><br>');
		default: document.write('<br> DISCONNECTED: '.concat(this.connectedComp,'<br>'));
	}

    // list vertices
    this.listVerts();
}

// -------------------

function topoSearchImpl(fun)
{
    connectedComp = 0;

    // mark all vertices unvisited
    for (var i = 0; i < this.nv; i++)
    {
        this.vert[i].visit = false;
    }

    // traverse unvisited connected components
    for (var i = 0; i < this.nv; i++)
    {
        if (!this.vert[i].visit)
        {
            fun == this.dfs ? this.dfs(i) : this.bfs(i);

            connectedComp++;
        }
    }

    return connectedComp;

}

// -------------------

function dfsImpl(v_i)
{
    // get landing vert by id then process
    var v = this.vert[v_i];
    v.visit = true;
    len = this.dfs_push.length;
    this.dfs_push[len] = v_i;

    // recursively traverse unvisited adjacent vertices
    var w = v.adjacentById();
    for (var j = 0; j < w.length; j++)
    {
        if (!this.vert[w[j]].visit)
        {
            this.dfs(w[j]);
        }
    }
}

// -------------------

function bfsImpl(v_i)
{
    // get vertex v by its id
    var v = this.vert[v_i];

    // process v
    v.visit = true;

    // initialize queue with v
    var q = new Queue();
    q.enqueue(v_i);


    // while queue not empty
    while (!q.isEmpty())
    {

        // dequeue and process a vertex, u
        var u_i = q.dequeue();
        var u = this.vert[u_i];
        this.bfs_order[this.bfs_order.length] = u_i; //fill the bfs_order array when dequeu the vertex


        // queue all unvisited vertices adjacent to u
        var w = u.adjacentById();
        for (var i = 0; i < w.length; i++)
        {
            if (!this.vert[w[i]].visit)
            {
                this.vert[w[i]].visit = true;
                q.enqueue(w[i]);
            }
        }
    }
}

// --------------------

function makeAdjMatrixImpl()
{
    // initially create row elements and zero the adjacency matrix
    for (var i = 0; i < this.nv; i++)
    {

        this.adjMatrix[i] = [];

        for (var j = 0; j < this.nv; j++)
        {
            this.adjMatrix[i][j] = 0;
        }

        // for each vertex, set 1 for each adjacent

        var w = this.vert[i].adjacentById();

        for (var j = 0; j < w.length; j++)
        {
            this.adjMatrix[i][w[j]] = 1;
        }
    }
}

// -------------------

function makeAdjMatrixImpl2()
{
    // initially create row elements and zero the adjacency matrix
    for (var i = 0; i < this.nv; i++)
    {

        this.adjMatrix[i] = [];

        for (var j = 0; j < this.nv; j++)
        {
            this.adjMatrix[i][j] = 0;
        }

        // for each vertex, set 1 for each adjacent if unweighted, its weight if graph is weighted
        var adj = this.vert[i].adjacent.traverse();
        for (var j = 0; j < adj.length; j++)
        {
            var edge = adj[j];
            this.adjMatrix[i][edge.target_v] = this.weighted ? edge.weight : 1;
        }
    }
}

// -------------------

function makeAdjMatrixImpl3()
{
    for (var i = 0; i < this.nv; i++)
    {

        this.adjMatrix[i] = [];

        for (var j = 0; j < this.nv; j++)
        {
            this.adjMatrix[i][j] = 0;
        }

        // for each vertex, set 1 for each adjacent if unweighted, its weight if graph is weighted
        var enodes = this.vert[i].incidentEdges();
        for (var j = 0; j < enodes.length; j++)
        {
            var edge_node = enodes[j];
            this.adjMatrix[i][edge_node.adjVert_i] = this.weighted ? edge_node.edgeWeight : 1;
        }
    }
}

// -------------------

function isConnectedImpl()
{
    connectedComp = this.topoSearch(this.dfs); //Do topological search (DFS, or BFS) for the graph to see the number of connected components if not set
    return connectedComp == 1; //The graph is connected if it has only one connected component
}

// -------------------

function componentInfoImpl()
{

	switch(this.connectedComp){
		case 0: return ('no connectivity info <br><br>');
		case 1: return ('CONNECTED <br><br>');
		default: return ('DISCONNECTED: '.concat(this.connectedComp,'<br>'));
	}

}

// -------------------

function adjacentByIdImpl()
{
    var traversal = this.adjacent.traverse();

    var traversal_array = [];

    for (var i = 0; i < traversal.length; i++)
    {
        traversal_array[i] = traversal[i].target_v;
    }

    return traversal_array;
}

// -------------------

function incidentEdgesImpl()
{
    var edges = this.adjacent.traverse(); //get array of incident edges objects

    var edges_info = [];

    for (var i = 0; i < edges.length; i++)
    { //create an array of json objects which contains edge information.
        edges_info[i] = {
            adjVert_i: edges[i].target_v,
            edgeLabel: "",
            edgeWeight: edges[i].weight
        };
    }

    return edges_info;
}

// -------------------

function vertexInfoImpl()
{
    var info = "".concat(" {", this.label, "} - VISIT: ", this.visit, " - ADJACENCY: ", this.adjacentById(), "<br>");

    return info;

}

// -------------------

function insertAdjacentImpl(v_i, weight)
{
    this.adjacent.insert(new Edge(v_i, weight));
}

// -------------------

//not implemented now
function makeGraphImpl()
{
}

// -------------------

// Implementing functions of priority queue
/**
   Return true if the queue is empty otherwise return false.
   @implements PQueue#isEmpty
   @returns {boolean} True if PQ is empty
*/
function isEmptyImpl()
{
    // check if PQ is empty or not
	return (this.pq.isEmpty());

}

// -----------------------------------------------------------------------

/**
   Remove the item with the minimum priority from
   the priority queue and return the data item
   of removed item.
   @implements PQueue#deleteMin
   @return {integer} The data item of deleted item with the minimum priority
*/
function deleteMinImpl()
{
       // pointer ponits to the first node in the PQ
       var pointer = this.pq.first;
       // the node of item with minimum value of key is the first node of PQ (intial value)
       var minimum = this.pq.first;
       // initialize the previous node of node of item with minimum value with null value
       var previous = null ;
       // search for the node of item with the minimum value of key
       while(pointer != null){
           // check if the key of the current item is smaller than the key of the minimum item
         if((pointer.next != null) && (pointer.next.item.prior < minimum.item.prior)){
           // update the value of node of item with the minimum value of key
           minimum = pointer.next ;
           // update the value of node that has previous item of the minimum item
           previous = pointer ;
         }
         // to move to the next node in PQ
         pointer = pointer.next;
       }
       // check if node of item with minimum value of key is the first one in PQ
       if(minimum == this.pq.first){
          // return the data item of item with the minimum value of key and delete it
          return this.pq.deleteFirst().item;
       }else{ // if node of item with minimum value of key is not the first one in PQ
          // previous node points to the node next to the node with minimum item
          previous.next = minimum.next;
          // return the data item of item with the minimum value of key
          return minimum.item.item;
       }
}

// -----------------------------------------------------------------------

/**
   Insert a new item into the priority queue
   or update an item with new priority if the new key
   smaller than the current key.
   @implements PQueue#insert
   @param {ineger} item Data item to be inserted in the PQ (vertex id)
   @param {integer} key Priority key value
*/
function insertImpl(item, key)
{
    // creat new PQNode to store the item and key
    var item = new PQNode(item,key);
    // pointer ponits to the first item in the PQ
    var pointer = this.pq.first;
    // boolean variable : true in insert case and false in update case
    var toInsert = true;
    // check if the PQ is empty so it must be the insert case
    if (this.isEmpty()) {
        // insert the item in the first of the PQ
        this.pq.insert(item);
        // change toInsert variable to false to not insert again the first position
        toInsert = false;

    } else { // if PQ is  not empty so it might be either the insert case or update case
        // search for the received item if it exists then it must be the update case
        while (pointer != null) {
            // if the data item of the received item equal to some data item for an item in PQ
            if (item.item == pointer.item.item) {
                // update the priority value
                pointer.item.prior = key;
                //change toInsert variable to false to not insert the updated item
                toInsert = false;
                // break the loop
                break;
            }
            // to go to the next item in the PQ
            pointer = pointer.next;
        }

    }
    // insert case
    if (toInsert) {
        // insert item in PQ
        this.pq.insert(item);
    }

}
