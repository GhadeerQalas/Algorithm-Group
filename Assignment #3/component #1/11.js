// CPCS 324 Algorithms & Data Structures 2
// Reference starter - Basic Flow Network Package
// 2019, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// a maximum flow implementation based on simple graph object with 
// minimal linked-list edge implementation and fields
//


var _v = [], _e = [];   // note naming conventions in upload guide


// -----------------------------------------------------------------------
function _main()   
{
	// create object for flow network 
	var fNetwork = new FNetwork();
    fNetwork.F.label = "Figure 10.4 (Levitin, 3rd edition)";
        
}


// -----------------------------------------------------------------------
// network object initial requirements: support Edmonds-Karp maximum flow algorithm

function FNetwork()   
{

	// --------------------
	// student property fields next

	this.F = new Graph(); 
	this.vertLabel = []; 
	this.F.digraph = true; 
	this.F.weighted = true;
	
	
	// --------------------
	// student member methods next
	
	// note following are required method names, you are not required to use all of them
	// but must use the name if you choose to have the method

	// accessor methods: getters
	this.edgeFlow= edgeFlowImpl;   // return (get) flow for argument edge i,j
	this.edgeCap=edgeCapImpl;      // return capacity for argument edge i,j
	this.srcVertex=srcVertexImpl;  // return source vertex (or its id, you decide)
	this.sinkVertex= sinkVertexImpl; // return sink vertex (or its id, you decide)
	this.getFlowVal                // return current flow *value* in network
	this.getFlow                   // return current flow as array of {u,v,flow} objects
	this.inFlow                    // return incoming flow for argument vertex
	this.outFlow                   // return outgoing flow for argument vertex
	
	// accessor methods: setters
	this.setEdgeFlow               // set flow on argument edge (i,j)
	this.setFlow                   // set flow to argument (including 0) for all edges 
	this.initFlow= initFlowImpl;   // reset flow to 0 for all edges
	this.setLabel= =setLabelImpl;  // set network label (hide Graph code)
	
	
	// other possibly useful method names
	this.isSrc                     // true if argument is source vertex of network      
	this.isSink                    // true if argument is sink vertex of network
	this.isEdge                    // true if argument vertices form an edge ALERT belong to Graph() but leave as test to students
	this.isBackwardEdge=isBackwardEdgeImpl;   // true if argument vertices form a backward edge
	this.readNetwork= readNetworkImpl;               // input reader method
	this.printNetwork              // output network including current flow (reference output of final project
	this.edmondsKarp= edmondsKarpImpl;  // implement the Edmonds-Karp max flow algorithm for maximum flow, must return number of paths used to augment flow
	

}

// -----------------------------------------------------------------------
// similar to starter 8
function Vertex(v)
{

	
}

// -----------------------------------------------------------------------
// similar to starter 8
function Edge(vert_i,weight)
{


}


// -----------------------------------------------------------------------
// similar to starter 8 (REMOVE transitive closure/greedy package stuff)
function Graph()
{
	// base property fields
    this.vert = [];								// vertex list (an array of Vertex objects)
    this.nv = 0;								// number of vertices
    this.ne = 0;								// number of edges
    this.digraph = false;						// true if digraph, false otherwise (default undirected)
    this.weighted = false;						// true if weighted graph, false otherwise (default unweighted)
    this.dfs_push = [];							// DFS order output
    this.bfs_order = [];						// BFS order output
    this.label = "";							// identification string to label graph
    this.connectedComp = 0;						// number of connected comps set by DFS; 0 (default) for no info
    this.adjMatrix = [];						// graph adjacency matrix to be created on demand

	// base member methods
    this.listVerts = listVertsImpl;
    this.readGraph = better_input;				// default input reader method
    this.addEdge = addEdgeImpl3;				// Insert an edge
    this.printGraph = printGraphImpl;			// better printer function
    this.makeGraph = makeGraphImpl;				// Create a graph
    this.dfs = dfsImpl;							// DFS a connected component
    this.bfs = bfsImpl;							// BFS a connected component
    this.makeAdjMatrix = makeAdjMatrixImpl;
    this.isConnected = isConnectedImpl;
    this.componentInfo = componentInfoImpl;
    this.topoSearch = topoSearchImpl;

}


// -----------------------------------------------------------------------
// functions used by methods of FNetwork and ancillary objects

// -----------------------------------------------------------------------
// begin student code section
// -----------------------------------------------------------------------

// flow network package (REMOVE transitive closure/greedy package stuff)

	
/**
   Implement the Edmonds-Karp max flow algorithm for maximum flow.
   @author Elham & Ghadeer
   @implements FNetwork#edmondsKarp
  
*/

function edmondsKarpImpl()
{
	this.initFlow(); //initialize flow with 0
	
    var queue = new Queue();
    var source = this.srcVertex();
	
	//initialize the queue with source
    this.setLabel(source,Infinity,"-");
    queue.enqueue(source);
    
    while(!queue.isEmpty()){
        var i = queue.dequeue();   //Take the first vertex id from the queue
        for(var j=0; j<this.F.nv; j++){
            if(this.isEdge(i,j)){   //forward edges, from i to j 
                
                if(this.vertLabel[j] === undefined){
                    var residualVal = this.edgeCap(i,j) - this.edgeFlow(i,j); //calculate residual value
                    if (residualVal>0){                                      //check If the value of residual is positive 
                        this.setLabel(j, Math.min(this.vertLabel[i].label1, residualVal), i+1); //augment the edge
                        queue.enqueue(j);                                  
                    } 
                }
            }        
        }//end for loop

        for(var j=0; j<this.F.nv; j++){    //backward edges, from j to i 
            if(this.isBackwardEdge(i,j)){     //check if argument vertices form a backward edge
                if(this.vertLabel[j] === undefined){
                    if(this.edgeFlow(j,i)>0){           //check if the flow is positive from j to i
                        this.setLabel(j, Math.min(this.vertLabel[i].label1, this.edgeFlow(j,i)), -1*(i+1));
                        queue.enqueue(j);
                         
                    }
                }
            }        
        }

        var sink = this.sinkVertex();
        if(!(this.vertLabel[sink] === undefined)){      //The sink vertex has been labeled.
///////*********************************************
            
        }
    }//end while loop	
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
    this.F.readGraph(v, e);
    this.F.makeAdjMatrix();
}

//-------------------------
/**
   Reset flow to 0 for all edges
   @author Elham Saleem 
   @implements FNetwork#initFlow
*/
function initFlowImpl()
{
	var i,j;
    for(i=0; i<this.F.nv ; i++){
        var edge = this.F.vert[i].adjacent.traverse();
        for(j=0; j<edge.length; j++){
            edge[j].flow = 0;
        }
    }
}
//---------------------------
/**
   Return source vertex
   @author Elham Saleem
   @implements FNetwork#srcVertex
*/
function srcVertexImpl()
{
    return 0;
}
//------------------------
/**
   set network label (hide Graph code)
   @author Elham Saleem
   @implements FNetwork#setLabel 
   @param {integer} v vertex id to set its label 
   @param {integer} Label_1 first label
   @param {integer} Label_2 second label
*/
function setLabelImpl(v, Label_1 , Label_2)
{
    this.vertLabel[v] = {
        label1: Label_1 ,
        label2: Label_2
    }
}
//------------------------
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
    var V = this.F.vert[i];
    var adj = V.adjacent.traverse();
    for (var k = 0; k < this.adj.length; k++){
         if(adj[k].target_v == j){
             return adj[k].weight;
         }
    }
}
//------------------------
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
    var V = this.F.vert[i];
    var adj = V.adjacent.traverse();
    for (var k = 0; k < this.adj.length; k++){
         if(adj[k].target_v == j){
             return adj[k].flow;
         }
    }
}
//----------------------
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
    return this.F.adjMatrix[j][i] != 0;

}
//------------------------
/**
   return sink vertex (or its id, you decide)
   @author Elham Saleem
   @implements FNetwork#sinkVertex
*/
function sinkVertexImpl()
{
    return this.F.nv -1;
}


// -----------------------------------------------------------------------
// published docs section (ref. assignment page)
// similar to starter 8 (strip line comments, leave outline)
// no JSDOC comments in this section
// -----------------------------------------------------------------------

function list_vert()
{

}   // etc.

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

// --------------------
function makeAdjMatrixImpl()
{
    for (var i = 0; i < this.nv; i++)
    {
        //get vertex
        var v = this.vert[i];

        //create and initialize the corresponding row
        this.adjMatrix[i] = [];
        for (var j = 0; j < this.nv; j++)
        {
            this.adjMatrix[i][j] = 0;
        }

        //process adjacent vertices: get by edge node, set value for each
        var e = v.adjacentByID();
        var info = v.incidentEdges();
        for (var j = 0; j < e.length; j++)
        {
            this.adjMatrix[i][e[j]] = this.weighted ? info[j].edgeWeight : 1;
        }
    }
}
//------------------------
function addEdgeImpl(u_i, v_i)
{
    //fetch vertices using their idm where u: edge source vertex, v: target vertex
    var u = this.vert[u_i],
        v = this.vert[v_i];

    //insert (u,v), i.e. insert v (by id) in adjacency list of u
    u.adjacent.insert(v_i);

    // insert (v,u) if undirected graph (repeat above but reverse vertex order)
    if (!this.digraph)
    {
        v.adjacent.insert(u_i);
    }
}

// --------------------
function addEdgeImpl2(u_i, v_i, weight)
{
    // fetch vertices using their id, where u: edge source vertex, v: target vertex
    var u = this.vert[u_i],
        v = this.vert[v_i];

    // insert (u,v), i.e., insert v in adjacency list of u
    // (first create edge object using v_i as target, then pass object)
    var e = new Edge();
    e.target_v = v_i;
    e.weight = weight;
    u.adjacent.insert(e);

    // insert (v,u) if undirected graph (repeat above but reverse vertex order)
    if (!this.digraph)
    {
        e = new Edge();
        e.target_v = u_i;
        e.weight = weight;
        v.adjacent.insert(e);
    }
}

// --------------------
function addEdgeImpl3(u_i, v_i, weight)
{
    // fetch vertices using their id, where u: edge source vertex, v: target vertex
    var u = this.vert[u_i],
        v = this.vert[v_i];

    // insert (u,v), i.e., insert v in adjacency list of u
    // (first create edge object using v_i as target, then pass object)
    u.insertAdjacent(v_i, weight);

    // insert (v,u) if undirected graph (repeat above but reverse vertex order)
    if (!this.digraph)
    {
        v.insertAdjacent(u_i, weight);
    }
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
// --------------------
function bfsImpl(v_i)
{
    // get vertex v by its id
    var v = this.vert[v_i];

    // process v
    v.visit = true;
    this.bfs_order[this.bfs_order.length] = v_i;

    // initialize queue with v
    var q = new Queue();
    q.enqueue(v);

    // while queue not empty
    while (!q.isEmpty())
    {
        // dequeue and process a vertex, u
        var u = q.dequeue();

        // queue all unvisited vertices adjacent to u
        var w = u.adjacentByID();
        for (var i = 0; i < w.length; i++)
        {
            if (!this.vert[w[i]].visit)
            {
                this.vert[w[i]].visit = true;
                q.enqueue(this.vert[w[i]]);
                this.bfs_order[this.bfs_order.length] = w[i];
            }
        }
    }
}
// --------------------
function dfsImpl(v_i)
{
    // get vertex v by its id
    var v = this.vert[v_i];

    // process v
    v.visit = true;
    this.dfs_push[this.dfs_push.length] = v_i;

    // recursively traverse unvisited adjacent vertices
    var w = v.adjacentByID();
    for (var i = 0; i < w.length; i++)
    {
        if (!this.vert[w[i]].visit)
        {
            this.dfs(w[i]);
        }
    }
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
function isConnectedImpl()
{
    return this.connectedComp == 0 ? true : false;
}

// --------------------
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
function topoSearchImpl(fun)
{
    // mark all vertices unvisited
    for (var i = 0; i < this.nv; i++)
    {
        this.vert[i].visit = false;
    }
    // traverse a connected component
    for (var i = 0; i < this.nv; i++)
    {
        if (!this.vert[i].visit)
        {
            fun == 0 ? (this.connectedComp++, this.dfs(i)) : (this.connectedComp++, this.bfs(i));
        }
    }
}
