function make_slides(f) {
  var   slides = {};

/* For Ling245, no need to change the code
 for i0 and consent slides*/
  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.consent = slide({
     name : "consent",
     start: function() {
      exp.startT = Date.now();
      $("#consent_2").hide();
      exp.consent_position = 0;
     },
    button : function() {
      if(exp.consent_position == 0) {
         exp.consent_position++;
         $("#consent_1").hide();
         $("#consent_2").show();
      } else {
        exp.go(); //use exp.go() if and only if there is no "present" data.
      }
    }
  });

/*Consult the code in the consent slide if you
  want to break down very long instructions */
  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.example = slide({
    name: "example",
    start: function() {
      $(".err").hide();
      $('input[name=exChoice]:checked').prop('checked', false);
    },
    button : function() {
    // make sure participants understand
    // the task before they continue
      // response = $("#text_response").val();
      // if (response.length == 0) {
      //   $(".err").show();
      // } else {
      //   exp.data_trials.push({
      //     "trial_type" : "example",
      //     "response" : response
      //   });
      //   exp.go(); //make sure this is at the *end*, after you log your data
      // }
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });


  slides.priming = slide({
    name: "priming",
    start: function() {
      $("#primingCondition").html("This is a priming sentece with " + exp.condition);
    },


    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.)
      Remember to comment out the other
      specification of present below*/

/*
    resent: _.shuffle([
      {speaker: "John"},
      {speaker: "Mary"}
    ]),

    /* It might be the case that the
    array of things you want to present depends
    on the condition. A solution is
    to define the array when the condition
    is determined, e.g., in init().
    Remember to comment out the other
    specification of present above*/
    //present: _.shuffle(exp.primingStims),


    present_handle: function(stim){

      $("#primingCondition").html("This is a sentence with " + exp.condition);

      // use this version if present is directly given
      $("#primingSentence").html(stim.speaker +
       " said a sentence with " + exp.condition);

      // use this version if present depends on the condition
      //$("#primingSentence").html(stim);
      this.stim = stim; //you can store this information in the slide so you can record it later.
    },

    button : function() {
      _stream.apply(this);
    },
  });

  // slides.example = slide({
  //   name: "example",
  //   start: function() {
  //     $(".err").hide();
  //     $(".display_condition").html("You are in " + exp.condition + ".");
  //   },
  //   button : function() {
  //     response = $("#text_response").val();
  //     if (response.length == 0) {
  //       $(".err").show();
  //     } else {
  //       exp.data_trials.push({
  //         "trial_type" : "example",
  //         "response" : response
  //       });
  //       exp.go(); //make sure this is at the *end*, after you log your data
  //     }
  //   },
  // });

  slides.trial = slide({
     name : "trial",
     present: exp.all_stims,

     // PRESENT THE SLIDE
     present_handle: function(stim) {
       $(".err").hide();
       this.trial_start = new Date();
       this.stim = stim;
       console.log(this.stim);
       // this.type = stim.title;
       // this.not_paid_attention = false;
       $("#audio_player").data("num-plays", 0);

       // console.log("Trial: " + stim.audio);
       // $("#error_audio").hide();
       // $("#attention_check").hide();
       // $("#done_check").hide();
       // $("#error_check").hide();
       // $("#perception").hide();
       // $("#done_percept").hide();
       // $("#error_percept").hide();
       // $("#attention_check").data("dont-show", false);
       // $("input[type=radio]").attr("checked", null);
       // $("textarea").val("");

       // $("#audio_src_ogg").attr("src", 'audio/'+ stim.audio + '.ogg');
       $("#audio_src_mp3").attr("src", '../audio/'+ stim.speaker+'_'+stim.word+'_'+stim.length+'.mp3');


       $("#audio_player").load();
       $("#audio_player").trigger("play");

       Adjs = _.shuffle([ ["not feminine", "feminine"], ["not masculine", "masculine"], ["not gay", "gay"],
    ["not flamboyant", "flamboyant"], ["not intelligent", "intelligent"], ["not sincere", "sincere"],
    ["not friendly", "friendly"], ["not educated", "educated"]]);

       exp.adjs = Adjs;

       divHtml = "";
       for (i = 0; i < 8; i++){

         divHtml += '<p>' + Adjs[i][0] +
         ' <input type="radio" name="' + Adjs[i][1] +
         '" value="1"> <input type="radio" name="' + Adjs[i][1] +
         '" value="2"> <input type="radio" name="' + Adjs[i][1] +
         '" value="3"> <input type="radio" name="' + Adjs[i][1] +
         '" value="4"> <input type="radio" name="' + Adjs[i][1] +
         '" value="5"> <input type="radio" name="' + Adjs[i][1] +
         '" value="6"> <input type="radio" name="' + Adjs[i][1] +
         '" value="7"> ' + Adjs[i][1] + '</p>';


       }


       $("#responses").html(divHtml);






       // $("#radio_label_1").text(this.stim.topics[0]);
       // $("#radio_label_2").text(this.stim.topics[1]);
       // $("#radio_label_3").text(this.stim.topics[2]);
       // $("#radio_label_4").text(this.stim.topics[3]);
       // $("#radio_label_5").text(this.stim.topics[4]);
       // $("#radio_label_6").text(this.stim.topics[5]);
       //
       //
       // $("#radio_1").val(this.stim.topics[0]);
       // $("#radio_2").val(this.stim.topics[1]);
       // $("#radio_3").val(this.stim.topics[2]);
       // $("#radio_4").val(this.stim.topics[3]);
       // $("#radio_5").val(this.stim.topics[4]);
       // $("#radio_6").val(this.stim.topics[5]);

       //
       // this.sentences = ["Speaker 2 agrees with Speaker 1","Speaker 2 disagrees with Speaker 1","Speaker 2 likes the " + this.stim.topic,"Speaker 2 dislikes the " + this.stim.topic,"Speaker 2 is happy","Speaker 2 is unhappy"];
       // this.sentences = _.shuffle([["Speaker 2 disagrees with Speaker 1","Speaker 2 agrees with Speaker 1"],["Speaker 2 dislikes the " + this.stim.topic, "Speaker 2 likes the " + this.stim.topic],["Speaker 2 is unhappy", "Speaker 2 is happy"]]);
       // var questionhtml = "How "+this.stim.adjective+" does the speaker think their friend is?";
       // $("#question").html(questionhtml);
       //
       // this.sentences = [["disagrees with Speaker 1","agrees with Speaker 1", "agree"],["dislikes the " + this.stim.adjective, "likes the " + this.stim.adjective, "like"]];
       // this.n_sliders = this.sentences.length;
       // // this.shuffled_sentences = exp.shuffled_sentences;
       // $(".slider_row").remove();
       // for (var i=0; i<this.n_sliders; i++) {
       //   var sentence_left = this.sentences[0];
       //   var sentence_right = this.sentences[1];
       //   $("#multi_slider_table").append('<tr class="slider_row"><td class="slider_target_left" id="sentence_left' + i + '">' + sentence_left + '</td><td colspan="2"><div id="slider' + i + '" class="slider"><td class="slider_target_right" id="sentence_right' + i + '">' + sentence_right + '</td>-------[ ]--------</div></td></tr>');
       //   utils.match_row_height("#multi_slider_table", ".slider_target");
       // }
       //
       // this.init_sliders(this.sentences);
       // exp.sliderPost = [];


     },



     //
     // init_sliders : function(sentence_types) {
     //   for (var i=0; i<sentence_types.length; i++) {
     //     var sentence_type = sentence_types[i];
     //     utils.make_slider("#slider" + i, this.make_slider_callback(i));
     //   }
     // },
     //
     // make_slider_callback : function(i) {
     //   return function(event, ui) {
     //     exp.sliderPost[i] = ui.value;
     //
     //   };
     // },



     // //FIRST BUTTON
     // button_audio : function() {
     //   $("#attention_check").show();
     //   $("#done_check").show();
     //   $("#done_audio").hide();
     // },

     // //SECOND BUTTON: CHECK THAT THEY SELECT THE CORRECT ATTENTION CHECK ANSWER
     // button_check : function() {
       // function check_check(){
       // var checked_radio  = $('input[name="audio"]:checked');

       //this.response  = true;
       // if (checked_radio == undefined  || checked_radio.val() != this.stim.topic) {
      //if (this.response == false) {
         // $("#error_check").show();
         // if (checked_radio.val() != this.stim.topic) {
           // this.not_paid_attention = true;
         // }
       // } else {
         // this.pre_check_response = checked_radio.val();
     //     $("#perception").show();
     //     $("#done_percept").show();
     //     $("#done_check").hide();
     //     $("#error_check").hide();
     //     $("#attention_check").hide();
     //     $("#attention_check").data("dont-show", true);
     //
     //   // };
     // },

     // //THIRD BUTTON: CHECK THAT THEY MOVED ALL SLIDERS
     button_percept : function() {
       // function check_percept(){
         // this.response = $('input[name="audio"]:checked').val();
         all_checked = true;
         exp.responses = {};
         for (i = 0; i < 8; i++){
           exp.responses[exp.adjs[i][1]] =
           $('input[name=' + exp.adjs[i][1] + ']:checked').val();
           if (exp.responses[exp.adjs[i][1]] == null) {
             all_checked = false;
           }
         }

         exp.attentionResponse = $('input[name=attention]:checked').val();


         // verify the response
         if (!all_checked || exp.attentionResponse == null) {
           $(".err").show();
         } else {
           this.log_responses();

           /* use _stream.apply(this); if and only if there is
           "present" data. (and only *after* responses are logged) */
           _stream.apply(this);
         }


       // for (var i = 0; i < this.n_sliders; i++) {
       //   if ($("#slider" + i).slider("option", "value") < -0.1) {
       //     $("#error_percept").show();
       //     return;
       //   } else {
       //     this.responses.push([$("#slider" + i).slider("option", "value"), this.sentences[i][2]]);
       //   }
       // }

       // var text_field = $("#story-input").val();

       // this.open_answer = $("#other_percept").val();
       // this.responses.push([this.open_answer, "open_answer"]);


     },

     log_responses : function() {

       var resp = {
           "sentence": this.stim.sentence,
           "length": this.stim.length,
           "speaker": this.stim.speaker,
           "time": (new Date()) - this.trial_start,
           "num_plays": $("#audio_player").data("num-plays"),
           "attention":  exp.attentionResponse
         };

      for (i = 0; i < 8; i++){
           resp[exp.adjs[i][1]] = exp.responses[exp.adjs[i][1]];
      }
       //
       // for (var i = 0; i < this.responses.length; i++) {
       //   var x = this.responses[i];
       //   resp[x[1]] = x[0];
       // }

       exp.data_trials.push(resp);
     }

   });


  slides.critical = slide({
    name : "critical",

    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */
    present : _.shuffle([
       "John and Mary laugh.",
       "Does John and Mary laugh?",
       "John and I am happy."
    ]),

    //this gets run only at the beginning of the block
    present_handle : function(stim) {
      $(".err").hide();

      // uncheck the button and erase the previous value
      exp.criticalResponse == null;
      $('input[name=criticalChoice]:checked').prop('checked', false);
      $("#criticalSentence").html(stim);

      this.stim = stim; //you can store this information in the slide so you can record it later.

    },

    button : function() {
      //find out the checked option
      exp.criticalResponse = $('input[name=criticalChoice]:checked').val();

      // verify the response
      if (exp.criticalResponse == null) {
        $(".err").show();
      } else {
        this.log_responses();

        /* use _stream.apply(this); if and only if there is
        "present" data. (and only *after* responses are logged) */
        _stream.apply(this);
      }
    },

    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "critical",
        //"sentence": this.stim, // don't forget to log the stimulus
        "response" : exp.criticalResponse
      });
    }
  });

  // slides.one_slider = slide({
  //   name : "one_slider",
  //
  //   /* trial information for this block
  //    (the variable 'stim' will change between each of these values,
  //     and for each of these, present_handle will be run.) */
  //   present : [
  //     {subject: "dog", object: "ball"},
  //     {subject: "cat", object: "windowsill"},
  //     {subject: "bird", object: "shiny object"},
  //   ],
  //
  //   //this gets run only at the beginning of the block
  //   present_handle : function(stim) {
  //     $(".err").hide();
  //
  //     this.stim = stim; //I like to store this information in the slide so I can record it later.
  //
  //
  //     $(".prompt").html(stim.subject + "s like " + stim.object + "s.");
  //     this.init_sliders();
  //     exp.sliderPost = null; //erase current slider value
  //   },
  //
  //   button : function() {
  //     if (exp.sliderPost == null) {
  //       $(".err").show();
  //     } else {
  //       this.log_responses();
  //
  //       /* use _stream.apply(this); if and only if there is
  //       "present" data. (and only *after* responses are logged) */
  //       _stream.apply(this);
  //     }
  //   },
  //
  //   init_sliders : function() {
  //     utils.make_slider("#single_slider", function(event, ui) {
  //       exp.sliderPost = ui.value;
  //     });
  //   },
  //
  //   log_responses : function() {
  //     exp.data_trials.push({
  //       "trial_type" : "one_slider",
  //       "response" : exp.sliderPost
  //     });
  //   }
  // });

  // slides.multi_slider = slide({
  //   name : "multi_slider",
  //   present : _.shuffle([
  //     {"critter":"Wugs", "property":"fur"},
  //     {"critter":"Blicks", "property":"fur"}
  //   ]),
  //   present_handle : function(stim) {
  //     $(".err").hide();
  //     this.stim = stim; //FRED: allows you to access stim in helpers
  //
  //     this.sentence_types = _.shuffle(["generic", "negation", "always", "sometimes", "usually"]);
  //     var sentences = {
  //       "generic": stim.critter + " have " + stim.property + ".",
  //       "negation": stim.critter + " do not have " + stim.property + ".",
  //       "always": stim.critter + " always have " + stim.property + ".",
  //       "sometimes": stim.critter + " sometimes have " + stim.property + ".",
  //       "usually": stim.critter + " usually have " + stim.property + "."
  //     };
  //
  //     this.n_sliders = this.sentence_types.length;
  //     $(".slider_row").remove();
  //     for (var i=0; i<this.n_sliders; i++) {
  //       var sentence_type = this.sentence_types[i];
  //       var sentence = sentences[sentence_type];
  //       $("#multi_slider_table").append('<tr class="slider_row"><td class="slider_target" id="sentence' + i + '">' + sentence + '</td><td colspan="2"><div id="slider' + i + '" class="slider">-------[ ]--------</div></td></tr>');
  //       utils.match_row_height("#multi_slider_table", ".slider_target");
  //     }
  //
  //     this.init_sliders(this.sentence_types);
  //     exp.sliderPost = [];
  //   },
  //
  //   button : function() {
  //     if (exp.sliderPost.length < this.n_sliders) {
  //       $(".err").show();
  //     } else {
  //       this.log_responses();
  //       _stream.apply(this); //use _stream.apply(this); if and only if there is "present" data.
  //     }
  //   },
  //
  //   init_sliders : function(sentence_types) {
  //     for (var i=0; i<sentence_types.length; i++) {
  //       var sentence_type = sentence_types[i];
  //       utils.make_slider("#slider" + i, this.make_slider_callback(i));
  //     }
  //   },
  //   make_slider_callback : function(i) {
  //     return function(event, ui) {
  //       exp.sliderPost[i] = ui.value;
  //     };
  //   },
  //   log_responses : function() {
  //     for (var i=0; i<this.sentence_types.length; i++) {
  //       var sentence_type = this.sentence_types[i];
  //       exp.data_trials.push({
  //         "trial_type" : "multi_slider",
  //         "sentence_type" : sentence_type,
  //         "response" : exp.sliderPost[i]
  //       });
  //     }
  //   },
  // });
  //
  // slides.vertical_sliders = slide({
  //   name : "vertical_sliders",
  //   present : _.shuffle([
  //     {
  //       "bins" : [
  //         {
  //           "min" : 0,
  //           "max" : 10
  //         },
  //         {
  //           "min" : 10,
  //           "max" : 20
  //         },
  //         {
  //           "min" : 20,
  //           "max" : 30
  //         },
  //         {
  //           "min" : 30,
  //           "max" : 40
  //         },
  //         {
  //           "min" : 40,
  //           "max" : 50
  //         },
  //         {
  //           "min" : 50,
  //           "max" : 60
  //         }
  //       ],
  //       "question": "How tall is tall?"
  //     }
  //   ]),
  //   present_handle : function(stim) {
  //     $(".err").hide();
  //     this.stim = stim;
  //
  //     $("#vertical_question").html(stim.question);
  //
  //     $("#sliders").empty();
  //     $("#bin_labels").empty();
  //
  //     $("#sliders").append('<td> \
  //           <div id="slider_endpoint_labels"> \
  //             <div class="top">likely</div> \
  //             <div class="bottom">unlikely</div>\
  //           </div>\
  //         </td>')
  //     $("#bin_labels").append('<td></td>')
  //
  //     this.n_sliders = stim.bins.length;
  //     for (var i=0; i<stim.bins.length; i++) {
  //       $("#sliders").append("<td><div id='vslider" + i + "' class='vertical_slider'>|</div></td>");
  //       $("#bin_labels").append("<td class='bin_label'>" + stim.bins[i].min + " - " + stim.bins[i].max + "</td>");
  //     }
  //
  //     this.init_sliders(stim);
  //     exp.sliderPost = [];
  //   },
  //
  //   button : function() {
  //     if (exp.sliderPost.length < this.n_sliders) {
  //       $(".err").show();
  //     } else {
  //       this.log_responses();
  //       _stream.apply(this); //use _stream.apply(this); if and only if there is "present" data.
  //     }
  //   },
  //
  //   init_sliders : function(stim) {
  //     for (var i=0; i<stim.bins.length; i++) {
  //       utils.make_slider("#vslider" + i, this.make_slider_callback(i), "vertical");
  //     }
  //   },
  //   make_slider_callback : function(i) {
  //     return function(event, ui) {
  //       exp.sliderPost[i] = ui.value;
  //     };
  //   },
  //   log_responses : function() {
  //     for (var i=0; i<this.stim.bins.length; i++) {
  //       exp.data_trials.push({
  //         "trial_type" : "vertical_slider",
  //         "question" : this.stim.question,
  //         "response" : exp.sliderPost[i],
  //         "min" : this.stim.bins[i].min,
  //         "max" : this.stim.bins[i].max
  //       });
  //     }
  //   },
  // });

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val(),
        problems: $("#problems").val(),
        fairprice: $("#fairprice").val()
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

function makeStim(stim) {
  var lengthcondition = _.shuffle(["shortened","lengthened"])[0];
  var speaker = _.shuffle(["Lewis","Scott","CJ","Brandon"])[0];
  var word = _.shuffle(["after","often"])[0];


  var onestim = stim;
  onestim.length = lengthcondition;
  onestim.speaker = speaker;
  onestim.word = word;

  exp.all_stims.push(onestim);
}
/// init ///
function init() {
  // console.log(stimuli);
  exp.all_stims = [];

  makeStim(_.shuffle(stimuli)[0]);

  console.log(exp.all_stims);
  // var length_conditions = ["lengthened","shortened"];
  // var valence_conditions = ["negative"];
  // var valence_conditions = ["positive","negative"];
  //specify conditions
  exp.condition = _.sample(["comparatives", "multiple negations"]); //can randomize between subject conditions here
  //blocks of the experiment:
  exp.structure=["i0", "consent", "instructions","trial", 'subj_info', 'thanks'];

  exp.primingStims = {"comparatives": ["John ate more food than this burger.",
                              "Mary had more pets than Fido."],
             "multiple negations": ["No head injury is too severe to depair",
             "No head injury is too trivial to ignore"]
    }[exp.condition];

  // generally no need to change anything below
  exp.trials = [];
  exp.catch_trials = [];
  exp.data_trials = [];
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };

  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}
