pragma solidity >=0.4.22 <0.6.0;
contract studentRecord{
    
    struct s_Record{
        uint32 id; 
        string s_name;
        string mark;
        string updatedTime;

    }
    
     mapping(uint32 => s_Record) public s_Records;

    constructor() public{
        
    }
    
    function addRecord(uint32 _idt,string memory sname,string memory markt, string  memory time) public {
        

            s_Records[_idt]=s_Record(
                _idt,
                sname,
                markt,
                time
            );
        
    }
    
function updateStudent(uint32 id,string memory mark) public payable{

        s_Records[id].mark=mark;
     
  }
  
  
  function display(uint32 _id) public view returns(uint32, string memory,string memory, string memory){
    return (s_Records[_id].id,s_Records[_id].s_name,s_Records[_id].mark,s_Records[_id].updatedTime);
  }
    
}