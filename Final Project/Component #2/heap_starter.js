// CPCS 324 Algorithms & Data Structures 2
// Outline - heap data structure starter
// 2018, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// Basic design decisions and implementation planning (objects & interfaces)
// ... complete before actual coding, test independently before reusing



// -----------------------------------------------------------------------
// Heap object constructor

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
	// student methods next; ; actual functions in student code section at end

}

// -----------------------------------------------------------------------
// functions used by methods of Heap() object

// note return interface for heapDeleteRoot() below
// use prefix 'heap' for implementing functions (see examples)
// if both key and item are needed, pass key before item
//
/**
 *  heapShow is a function for display the heap
 *  @function heapShow
 *  @author Arwa Fahad
 *  @return heap keys and data .
 */

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


// -----------------------------------------------------------------------
// --- begin student code section ----------------------------------------
// -----------------------------------------------------------------------
/**
 *  heapDeleteRoot is a function for deleting the root's key from heap, return data-item in root
 *  @function heapDeleteRoot
 *  @author Elham Saleem
 *  @return data item in root if the heap is not empty, otherwise return message "The heap is empty"
 */
function heapDeleteRoot()
{
	if (!this.isEmpty()) { 
		// save root key and item pair
		var root = [ this.h[1], this.h_item[1] ]; 
    }
	else {  //if heap is empty
		return "The heap is empty";
	}
	// ... complete
	this.h_item[1] = this.h_item[this.size];

    this.h[1] = this.h[this.size];
    this.heapify(1);
	
    //decrease the heap size by 1 since we delete from it
    this.size = this.size-1;

	return root;
}
