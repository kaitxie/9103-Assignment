

<script>
  const squares = document.querySelectorAll(".square");
  const pngs = document.querySelector(".png");
  
  squares.forEach((square)=>{
  square.addEventListener("dragover",(e)=>{
      e.preventDefault();
      square.classList.add("hovered");
    
  });
  
  square.addEventListener("dragleave",()=>{
      square.classList.remove("hovered");
  
  });
  
  square.addEventListener("drop",()=>{
      square.appendChild(png);
      square.classList.remove("hovered");
  });
  });
  </script>
  