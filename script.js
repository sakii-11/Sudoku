    const gridSize =9;

    document.addEventListener('DOMContentLoaded' , function () {
      const solveBtn = document.getElementById('solveBtn');
      solveBtn.addEventListener('click', solve);
      const sudokuGrid = document.getElementById('grid');



      for(let row=0; row<gridSize; row++)
      {
        //create new rows;
        const  newRow = document.createElement("tr");
        for(let col=0; col< gridSize; col++)
        {
          const cell = document.createElement("td");
          const input = document.createElement("input");
          input.type="number";
          input.className="cell";
          input.id = `cell-${row}-${col}`;
          cell.appendChild(input); //add input to cell
          newRow.appendChild(cell); //add cell to the row
        }
        sudokuGrid.appendChild(newRow);
      }
    });


    async function solve() {
      const sudokuArr = [];
      for(let row=0; row<gridSize; row++)
      {
        sudokuArr[row] =[];
        for(let col =0; col<gridSize; col++)
        {
          const cellId = `cell-${row}-${col}`;
          const cellValue = document.getElementById(cellId).value;
          sudokuArr[row][col]= cellValue !== "" ? parseInt(cellValue): 0;
        }
      }

      if(checkgiven(sudokuArr))
      {
        solveSudoku(sudokuArr);
      }
      else{
        alert("The given sudoku is wrong");
      }
    }

    async function solveSudoku(sudokuArr) {

      for(let row=0; row<gridSize; row++)
      {
        sudokuArr[row] =[];
        for(let col =0; col<gridSize; col++)
        {
          const cellId = `cell-${row}-${col}`;
          const cellValue = document.getElementById(cellId).value;
          sudokuArr[row][col]= cellValue !== "" ? parseInt(cellValue): 0;
        }
      }


      //indentify user input 
      for(let row=0; row<gridSize; row++)
      {
        for(let col=0; col<gridSize; col++)
        {
          const cellId = `cell-${row}-${col}`;
          const cell = document.getElementById(cellId);

          if(sudokuArr[row][col] !== 0)
          {
            cell.classList.add("user-input");
          }
        }
      }

      if(helper(sudokuArr)){
        for(let row=0; row<gridSize; row++)
        {
          for(let col=0; col<gridSize; col++)
          {
              const cellId =`cell-${row}-${col}`;
              const cell = document.getElementById(cellId);

              if(!cell.classList.contains("user-input")){
                cell.value= sudokuArr[row][col];
                cell.classList.add("solved");
                await sleep(20);
              }
              

          }
        }
      }
      else{
        alert("No solution exists for the given sudoku");
        exit(0);
      }

    }


    function helper(board){
      for(let row=0; row<gridSize; row++)
      {
        for(let col=0; col<gridSize; col++)
        {
          if(board[row][col] === 0)
          {
            for(let i=1; i<=9; i++)
            {
              if(isValid(board, row, col, i))
              {
                board[row][col]= i;
                if(helper(board))
                {
                  return true;
                }
                board[row][col]=0;
              }
            }
            return false;
          }
        }
      }
      return true;
    }


    function isValid(board, row, col, num)
    {
      for(let i=0; i<gridSize; i++)
      {
        if(board[row][i] === num || board[i][col] === num){
          return false;
        }
      }

      const startRow = Math.floor(row/3)*3;
      const startCol = Math.floor(col/3)*3;

      for(let i=startRow; i< startRow+3; i++)
      {
        for(let j=startCol; j<startCol+3 ; j++)
        {
          if(board[i][j] === num){
            return false;
          }
        }
      }
          return true;
    }

    function sleep(ms){
      return new Promise(resolve =>setTimeout(resolve, ms));
    }

    
    function checkgiven(board)
    {
      for(let i=0; i<9; i++)
      {if(!isValidRow(board,i)|| !isValidCol(board,i)|| !isValidSubgrid(board,i))
      return false;}
      return true;
    }


    function isValidRow(board, row) {
    let seen = new Set();
    for (let i = 0; i < 9; i++) {
        let num = board[row][i];
        if (num !== 0 && seen.has(num)) {
            return false;
        }
        seen.add(num);
    }
    return true;
}

function isValidCol(board, col) {
    let seen = new Set();
    for (let i = 0; i < 9; i++) {
        let num = board[i][col];
        if (num !== 0 && seen.has(num)) {
            return false;
        }
        seen.add(num);
    }
    return true;
}

function isValidSubgrid(board, box) {
    let seen = new Set();
    let startRow = Math.floor(box / 3) * 3;
    let startCol = (box % 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            let num = board[i][j];
            if (num !== 0 && seen.has(num)) {
                return false;
            }
            seen.add(num);
        }
    }
    return true;
}