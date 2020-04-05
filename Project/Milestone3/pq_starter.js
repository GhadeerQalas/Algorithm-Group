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
	this.isEmpty = isEmptyImp1;
	

	/**
      Remove/Return item with minimum priority
      @method
     */
	this.deleteMin = deleteMinImp1;              


	/**
      Insert/Update an item with priority
      @method
     */
	this.insert = insertImp1;                  
	
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
   Remove the item with the min priority from the PQueue and return it's data item .
   @author Reem Khalil
   @implements PQueue#deleteMin
   @return {integer} The data item of deleted item with the min priority 
*/

function deleteMinImpl()
{

	   // pointer first node in the PQ 
	   var pointer = this.pq.first;
	   
	   // the node of item with minimum value of key is the first node of PQ (intial value)
	   var minimum = this.pq.first;
	   
       // initialize the previous node of node of item with minimum value with null value
	   var previous = null ;
	   

       // search for the node of item with the minimum value of key 
       while(pointer != null){

           // check if the key of the current item is smaller than the key of the minimum item
		 if( (pointer.next != null) && (pointer.next.item.prior < minimum.item.prior) )
		 {

           // update the min. 
		   minimum = pointer.next ;
		   
           // update the previous 
		   previous = pointer ;
		   
		 }
		 
         // Update the pointer
		 pointer = pointer.next;
		 
	   }
	   
       // check if node of item with minimum value of key is the first one in PQ
	   if(minimum == this.pq.first)
	   { 

          // return the data item of item with the minimum value of key and delete it
		  return this.pq.deleteFirst().item;
		  
	   }
	   
	   else
	   {
		 
          // Update the previous to points the node next to the min
		  previous.next = minimum.next;
		  
          // return the data item of item with the minimum value of key
          return minimum.item.item;
       }
}



/**
   Insert a new item into the PQueue or update an item with new priority if the new key smaller than the current key.
   @author Reem Khalil
   @implements PQueue#insert
   @param {ineger} item Data item to be inserted in the PQ (vertex id)
   @param {integer} key Priority key value  
*/

function insertImpl(item, key)
{

    // creat new PQNode to store the item and key 
	var item = new PQNode(item,key);
	
    // pointer the first item in the PQ
	var pointer = this.pq.first;
	
    // true in insert and false in update (intialiy true) 
	var insert = true;
	
    // if the PQ is empty  
	if (this.isEmpty())
	{

		this.pq.insert(item);
		
        // Update insert val. to false
        insert = false;

	}
	
	else
	{ 
		
		// search the item and update it's key
        while (pointer != null) { 

			// if the data item equal to another data item in the PQ
            if (item.item == pointer.item.item) {

				// update the priority
				pointer.item.prior = key;
				
				// update insert val. to false 
				insert = false;
				
                // break the loop
                break; 
			}
			

			// update the pointer
            pointer = pointer.next;
        }

	}
	
	// insert new item
    if (insert) {

        this.pq.insert(item);
    }
    
}