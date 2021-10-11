const logout = () => {
    localStorage.clear();
    window.location.href = "./index1.html";
  };
  
  $(document).ready(() => {

    $.get(
      "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",
      (userData) => {
    
        const checkLogin = () => {
          if (!localStorage.getItem("login")) {
            window.location.href = "./index1.html";
          }
        };
  
        class userCards {
          constructor(filteruserData) {
            this.idnum = filteruserData.id;
            this.profilePic = filteruserData.profilePic;
            this.fullName = filteruserData.fullName;
            this.dob = filteruserData.dob;
            this.gender = filteruserData.gender;
            this.currentCity = filteruserData.currentCity;
            this.currentCountry = filteruserData.currentCountry;
          }
          printuserCards() {
            return `<tr>
          <td class="light"> ${this.idnum} </td>
          <td> <img src="${this.profilePic}" alt=""> </td>
          <td class="light"> ${this.fullName} </td>
          <td> ${this.dob} </td>
          <td class="light">${this.gender}</td>
          <td class="light">${this.currentCity}, ${this.currentCountry}</td>
      </tr>`;
          }
        }
  
        let allContent = userData;
  
        $("#search-form").submit((e) => {
          e.preventDefault();
  
    
          let inputVal = $("#search-box").val();
  
    
          if (!inputVal.trim()) {
            renderUI(allContent);
            return;
          }

          if (inputVal.length > 1) {
            $("#search-box").val("");
            const filterurl =
              "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=" +
              inputVal;
  
            $.get(filterurl, (filterData) => {
              renderUI(filterData);
            });
      
          } else {
            alert("please enter at least 2 character");
          }
        });

        const renderUI = (args) => {
          $("#cards").html(" ");
          $("#count").html(args.length);
          let generateuserCard = [];
          let htmlstr = " ";
  
          if (args.length > 0) {
            for (let i = 0; i < args.length; i++) {
              generateuserCard[i] = new userCards(args[i]);
              htmlstr += generateuserCard[i].printuserCards();
            }
            $("#cards").html(htmlstr);
          }
        };
  
        checkLogin();
  
        
        renderUI(userData);
  
        $(".reset-btn").click(() => renderUI(userData));
      }
    );
  });