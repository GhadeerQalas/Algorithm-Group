// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - Transitive Closure Package
// 2018, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge member fields and methods to be added later as needed
//

/**
  First of all we will create array input names for input files in this project
  v means vertex, e means edges
  @input  the input from external files
  exercise8_4_1, exercise8_4_7 and ksa12city
*/
var _v = [], _e = [];   // for exercise8_4_1
var _v2 = [], _e2 = []; // for exercise8_4_7
var _v3 = [], _e3 = []; // for ksa12city

// -----------------------------------------------------------------------

function main_graph()
{
  /**
  @graph in our project we need three graphs so we need to create graph and by default will be undirected
  */
    var g = new Graph();
    var g2 = new Graph();
    var g3 = new Graph();

    // set input graph properties (label, directed etc.)
	g.label = 'Exercise 8.4: 1 (Levitin, 3rd edition)';
	g.digraph = true;
  g2.label = 'Exercise 8.4: 7 (Levitin, 3rd edition)';
  g2.digraph = true;
  g3.label = 'KSA 12 Cities';

	/**
  @readGraph use global input arrays _v and _e to initialize its internal data structures
  */
	g.readGraph(_v, _e);
  g2.readGraph(_v2, _e2);
  g3.readGraph(_v3, _e3);

	// use printGraph() method to check graph
	g.printGraph();

	// perform breadth-first search and output stored result
	g.topoSearch(1);// 0 means DFS choice, while 1 means BFS choice of topological search
	document.write("<p>bfs_order: ", g.bfs_order, "</p>");

	// report connectivity status if available
	document.write("<p>", g.componentInfo(), "</p>");

    //output DFS-based transitive closure matrix
    g.DfsTC();
    document.write("<p> TC matrix by DFS:<br>");
    for (var i = 0; i < g.dfsTC.length; i++)
    {
        document.write(g.dfsTC[i], "<br>");
  	}

	/**
  @output_Warshall for graph g transitive closure matrix
  */
    document.write("<p>TC matrix by Warshall-Floyd:<br>");
    g.warshallFloyd();
    for (var i = 0; i < g.warshallTC.length; i++)
    {
        document.write(g.warshallTC[i], "<br>");
	}

	/**
  @Dag_graph for graph g check if the graph is DAG (directed acyclic graph)
  */
	document.write("<p>DAG: ", g.isDAG(), "</p>");

  /**
  @output_Warshall for graph g2 transitive closure matrix
  */
    document.write("<p>TC matrix by Warshall-Floyd:<br>");
    g.warshallFloyd();
    for (var i = 0; i < g2.warshallTC.length; i++)
    {
        document.write(g2.warshallTC[i], "<br>");
  }

  /**
  @Dag_graph for graph g check if the graph is DAG (directed acyclic graph)
  */
  document.write("<p>DAG: Exercise 8.4: 7", g2.isDAG(), "</p>");


	//output floyed-distance matrix
    g2.warshallFloyd();
    document.write("<p>Distance matrix<br>");

    for (var i = 0; i < g2.floydD.length; i++)
    {
        document.write(g2.floydD[i], "<br>");
    }

  /**
  @prim for graph g3 to find the minimum spanning tree using prim's algorithm
  @explain the PrimMST method is using to find minimum edges between vertices
  */
  g3.PrimMST();
  document.write("<p>MST for " + g3.label);
  var path = "( " + g3.Prim_Edge[0].v.label + " ";
  var MST_weight = 0;
  for (var i = 0; i < g3.Prim_Edge.length; i++)
  {
      path = path + " --" + g3.Prim_Edge[i].w + "--> " + g3.Prim_Edge[i].u.label;
      MST_weight = MST_weight + g3.Prim_Edge[i].w;
  }
  document.write("</br>" + path + " )</br>The total tree weight is " + MST_weight);

}


// -----------------------------------------------------------------------

function Vertex(v)
{
	// base property fields
	this.label = v.label;						// vertex can be labelled
	this.visit = false; 						// vertex can be marked visited or "seen"
  this.adjacent = new List();					// init an adjacency list

	// base member methods
	this.adjacentByID = adjacentByIdImpl; 		// Get id of adjacent vertices in an array.
  this.incidentEdges = incidentEdgesImpl;		// return target id of incident edges in array
  this.vertexInfo = vertexInfoImpl;			// Get vertex details in a printable string
  this.insertAdjacent = insertAdjacentImpl;	// Insert a new edge node in the adjacency list of vertex.
}

// -----------------------------------------------------------------------

function Edge(vert_i,weight)
{
	// base property fields
    this.target_v = vert_i;						//Id of edge target vertex
    this.weight = weight;						//Edge weight/cost
}


// -----------------------------------------------------------------------

function Graph()
{
	// base property fields
    this.vert = [];	// vertex list (an array of Vertex objects)
    this.nv = 0;	// number of vertices
    this.ne = 0;	// number of edges
    this.digraph = false;	// true if digraph, false otherwise (default undirected)
    this.weighted = false; // true if weighted graph, false otherwise (default unweighted)
    this.dfs_push = [];	// DFS order output
    this.bfs_order = []; // BFS order output
    this.label = ""; // identification string to label graph
    this.connectedComp = 0;	// number of connected comps set by DFS; 0 (default) for no info
    this.adjMatrix = []; // graph adjacency matrix to be created on demand

	// base member methods
    this.listVerts = listVertsImpl;
    this.readGraph = better_input;// default input reader method
    this.addEdge = addEdgeImpl3; // Insert an edge
    this.printGraph = printGraphImpl; // better printer function
    this.makeGraph = makeGraphImpl;	// Create a graph
    this.dfs = dfsImpl;	// DFS a connected component
    this.bfs = bfsImpl;	// BFS a connected component
    this.makeAdjMatrix = makeAdjMatrixImpl3;
    this.isConnected = isConnectedImpl;
    this.componentInfo = componentInfoImpl;
    this.topoSearch = topoSearchImpl;

    this.floydD = [];
    this.warshallTC = [];

	/**Transitive closure matrix , set after applying DfsTC.
		Stores output of last DfsTC call.*/
	this.dfsTC = [];
  this.Prim_Edge = [];
	// student methods
	/**
		Check if there is a path between two vertices in a digraph*/
	this.hasPath =  hasPathImpl;

	/**Get the length of the shortest path between two vertices in a weighted graph*/
	this.shortestPath = shortestPathImpl;

	/**Test if the diagraph is DAG (Directed Acyclic Graph)*/
	this.isDAG = isDAGImpl;

	/**Compute TC matrix if unweighed digraph, and distance matrix if weighted*/
	this.warshallFloyd = warshallFloydImpl;

	/**Compute DFS-Based TC matrix*/
	this.DfsTC = dfsTCImpl;

  this.PrimMST = PrimImpl;
}


// -----------------------------------------------------------------------
// functions used by methods of Graph and ancillary objects

// -----------------------------------------------------------------------
// begin student code section
// -----------------------------------------------------------------------

// transitive closure package


function hasPathImpl(u_i, v_i)
{
	return this.warshallTC[u_i][v_i] == 1? true : false;
}


function shortestPathImpl(u_i, v_i)
{
	return this.floydD[u_i][v_i];
}

/**
@function isDAGImpl
@type boolean
*/
function isDAGImpl()
{
	for (var i = 0, j = 0; i < this.warshallTC.length && j < this.warshallTC.length; i++, j++)
		if (this.hasPath(i, j))
			return false;
	return true;
}


function warshallFloydImpl()
{
    // implement the ADJACENCY matrix
    this.makeAdjMatrix();

    //Fill  warshallTC[] and distance matrices (floydD[]) by adjacent matrix
    for (var k = 0; k < this.adjMatrix.length; k++)
    {
        //Copy row by row
        this.warshallTC[k] = this.adjMatrix[k].slice();
        this.floydD[k] = this.adjMatrix[k].slice();
        for (var x = 0; x < this.nv; x++)
        {
            if (this.adjMatrix[k][x] == 0 &&  k!=x)
            {
                this.floydD[k][x] = Infinity;
            }
        }
    }

    // warshall-Floyed algorithm
    for (var k = 0; k < this.floydD.length; k++)
    {
        for (var i = 0; i < this.floydD.length; i++)
        {
            for (var j = 0; j < this.floydD.length; j++)
            {
                this.floydD[i][j] = Math.min(this.floydD[i][j], (this.floydD[i][k] + this.floydD[k][j]));
                this.warshallTC[i][j] = this.warshallTC[i][j] || (this.warshallTC[i][k] && this.warshallTC[k][j])?1:0;
            }
        }
    }

    //change the value from Infinity to 0 (because there is no distance = Infinity)
    for (var i = 0; i < this.floydD.length; i++)
        for (var j = 0; j < this.floydD.length; j++)
            if (this.floydD[i][j] == Infinity)
                this.floydD[i][j] = 0;

}


/**
 * Represents a function
 * @function dfsTCImpl
 * @author Ghadeer Qalas
 * @return traverse the vertices to check which is visited:
 * if visited set 1 in the corresponding TC matrix
 */
function dfsTCImpl()
{
    // for each vertex
    for (var i = 0; i < this.nv; i++)
    {
        //process vertex v
        var v = this.vert[i];

        // mark all vertices unvisited
        for (var p = 0; p < this.nv; p++)
        {
            this.vert[p].visit = false;
        }

        // create and init the corresponding row
        this.dfsTC[i] = [];
        for (var j = 0; j < this.nv; j++)
            this.dfsTC[i][j] = 0;

        //perform DFS search for each adjacent to the vertex v by its ID
        var w = v.adjacentByID();
        for (var n = 0; n < w.length; n++)
            this.dfs(w[n]); //for each adjacent vertex call dfs()

        //traverse the vertices to check which is visited
        for (var k = 0; k < this.nv; k++)
        {
            //if visited set 1 in the corresponding TC matrix
            if (this.vert[k].visit)
            {
                this.dfsTC[i][k] = 1;
            }
        }
    }
}

/**
 * Represents a function
 * @implement this function find the minimum spanning tree of the edges between vertices
 * @author Ghadeer Qalas
 * @function PrimImpl
 * @type void
 */
function PrimImpl()
{
    // // create nodes
    var n;
    // create vertices tree
    var verticesTree = [];

    // in this loop we should make all vertex unvisited
   // we will use variable un means unvisited
    for (var un = 0; un < this.nv; m++)
    {
        this.vert[un].visit = false;
    }
    // inatiat first index with first value on vert array
    verticesTree[0] = this.vert[0];
    this.vert[0].visit = true;

    var min = Infinity; // any number would be less than infinty

    for (var i = 0; i < this.nv; i++)
    {
        //get fringe vertices of the current vertext
        for (var j = 0; j < verticesTree.length; j++)
        {
            //get fringe vertices of the current vertext
            var incident_Edge = verticesTree[j].incidentEdges();
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
                            u: this.vert[incident_Edge[k].adjVert_i],
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
        this.Prim_Edge[n - 1].u.visit = true;
        min = Infinity;
    }
}


// -----------------------------------------------------------------------
// published docs section (ref. assignment page)
// use starter6-based P1M1 code as-is (fixes/improvements OK)
// no JSDOC comments in this section (docs already published)
// -----------------------------------------------------------------------
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
function better_output()
{
    // note bad pattern for long-term code
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

    document.write("<p>GRAPH {", this.label, "} ", this.weighted ? "" : "UN", "WEIGHTED, ", this.digraph ? "" : "UN", "DIRECTED - ",
        this.nv, " VERTICES, ", this.ne, " EDGES:</p>", out, "</p>");

    // list vertices
    this.list_vert();
}

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
function makeAdjMatrixImpl()
{
    //adjacency matrix initialzied by zero
    for (var i = 0; i < this.nv; i++)
    {
        this.adjMatrix[i] = [];

        for (var j = 0; j < this.nv; j++)
        {
            this.adjMatrix[i][j] = 0;
        }
    }

    // when vertex has an adjacency set 1
    var v, w;
    for (var i = 0; i < this.nv; i++)
    {
        v = this.vert[i];
        w = v.adjacentById();
        for (var j = 0; j < w.length; j++)
        {
            this.adjMatrix[i][w[j]] = 1;
        }
    }
}

// --------------------
function makeAdjMatrixImpl2()
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
        var e = v.adjacent.traverse(),
            m = e.length; //note encap mistake
        for (var j = 0; j < m; j++)
        {
            this.adjMatrix[i][e[j].target_v] = this.weighted ? e[j].weight : 1;
        }
    }
}

// --------------------
function makeAdjMatrixImpl3()
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

// --------------------
function makeGraphImpl(n, m, w)
{

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

// --------------------
function vertexInfoImpl()
{
    return " {" + this.label + "} - VISIT: " + this.visit + " - ADJACENCY: " + this.adjacentByID();
}
