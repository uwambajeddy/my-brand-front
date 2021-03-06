/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

let commentform = null;
let disibleControl = null;

const defineForm = setInterval(() => {

  if (commentform !== null) {

    commentform.addEventListener('submit', async (e) => {
      e.preventDefault();

      let comment = document.querySelector('#message').value;
      const id = document.querySelector('#userId').value;

      if (comment.trim() == '') {
        popup(warning, 'Please fill empty fields!!');
        return 0;
      }

      disibleControl.style.display = 'block';
      try {
        await axios.post(`${globalURL}/api/v1/blogs/comment/${id}`, {
          comment,
          jwt: `${jwt}`
        }
        );


        document.querySelector('#message').value = '';
        popup(success, "Thanks for your comment🤓, you'll wait for approval");
        disibleControl.style.display = 'none';
      } catch (error) {
        console.log(error);
        disibleControl.style.display = 'none';
        if (error.request.status === 401) {
          return location.assign('/login.html');
        }
        if (error.response.data?.message) {
          popup(failure, `${error.response.data.message}`);
        } else {
          popup(failure, `${error.message}`);
        }
      }
    });

    return clearInterval(defineForm)
  }

  disibleControl = document.querySelector('.disible-control');

  return commentform = document.querySelector('.comment_form');

}, 1000);
