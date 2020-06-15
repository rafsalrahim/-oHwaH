
pragma solidity >=0.4.22 <0.6.0;

contract studentRecord{
    
    struct s_Record{
        uint id;
        string s_name;
        string mark;
        string updatedTime;
        string updatedBy;
    }
    
     mapping(uint => s_Record[]) s_Records;
    constructor() public{
        
    }
    
    function addRecord(uint idt,string memory sname,string memory markt, string  memory time,string memory  by) public {
        

            s_Records[idt].push(s_Record({
                id:idt,
                s_name:sname,
                mark:markt,
                updatedTime:time,
                updatedBy:by
            }));
        
    }
    
function updateStudent(string memory s_name,uint id,string memory mark) public payable{

     s_Records[id][id].mark = mark;
  }
  
  
  function display(uint id) public view returns(string memory){
      return s_Records[id][id].mark;
  }
    
}