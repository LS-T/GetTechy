const addNewComment = async (event) => {
    event.preventDefault();
  
    const comment_text = document.querySelector("#comment_text").value.trim();
    const id = event.target.getAttribute("data-id");
    console.log(id);
  
    if (comment_text) {
      const response = await fetch(`/api/comments/${id}`, {
        method: "POST",
        body: JSON.stringify({ comment_text }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        console.log("working")
        document.location.replace(`/api/comments/${id}`);
      } else {
        console.log(response.statusText);
        alert("Commenting error.");
      }
    }
};
  
  
document.querySelector("#comment-button").addEventListener("click", addNewComment);
  