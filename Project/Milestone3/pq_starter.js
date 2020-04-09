// CPCS 324 Algorithms & Data Structures 2
// Outline - Priority queue data structure
// 2019, Dr. Muhammad Al-Hashimi


// -----------------------------------------------------------------------
// Basic design decisions and implementation planning (objects & interfaces)

// initial requirements: to quickly support Dijkstra and second Prim's algorithms, 
// implement minimum priority functionality

// design decisions:
// Reuse the 324 linked list implementation
// how will the PQ ops be implemented?
// <student fill here>

// code plan: start to write your API specifications (JSDOC comments) and think about 
// design consequences (design impact)

// Impact analysis:
// <student fill here>



// -----------------------------------------------------------------------
// Priority queue object constructor (document using JSDOC comments)


/**
   Create a priority queue

   @author Reem Khalil

   @constructor
*/

function PQueue()
{

	this.pq = new List();          // requirement: linked-list implementation

	
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



/**
   delete the first node in the pirorty queue and return it's data item .

   @author Reem Khalil

   @implements PQueue#deleteMin
   @return {integer} The data item of deleted node
*/

function deleteMinImpl()
{
    if (!this.isEmpty())
    {
        var temp = this.pq.first;
        this.pq.first = this.pq.first.next;
        return (temp.item.item);
    }

	
}



/**
   Insert a new item into the PQueue or update a priority of the item if the new key smaller than the current key.

   @author Reem Khalil

   @implements PQueue#insert
   @param {ineger} item Data item to be inserted in the PQ (vertex id)
   @param {integer} key Priority key value  
*/

function insertImpl(item, key)
{

    // creat new PQNode to store the item and key 
	var pqnode = new PQNode(item,key);
	

    //----------------------------------------
    // apdate case

    
    // walker variable
    var l = this.pq.first; 
 
    var previous;
 
    // walk down list 
    while (l != null)
    {
        if (pqnode.item == l.item.item)
        {
 
            // if the node is the first node then deleteMin & re-insert it  	
            if (l == this.pq.first)
            {
                
                this.deleteMin();

            }// otherwise, link the previous node with next & re-insert updated node
            else
            {
                previous.next = l.next;
            }

            break;
        }
        previous = l;
        l = l.next;
    }
 



    //----------------------------------------
    // insert case

    // pointer the first item in the PQ
	var pointer = this.pq.first;


    // if the PQ is empty  
	if (this.isEmpty())
	{
        this.pq.insert(pqnode); 

    }// if the key is the minimum , insert it in the first
    else if (pqnode.prior < pointer.item.prior)
    {   

        this.pq.first = new LNode(pqnode);
        this.pq.first.next = pointer;   

    } // otherwise walk down list and insert the node in the correct position
    else
    {
        var l = this.pq.first; // walker variable
        while (l.next != null)
        {
            if (l.next.item.prior > pqnode.prior)
            {
                break;
            }
            l = l.next;
        }
        var temp = new LNode(pqnode)
        temp.next = l.next;
        l.next = temp;
    }

   

}



