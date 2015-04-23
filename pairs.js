var People = new Meteor.Collection("people");
var Pairs = new Meteor.Collection("pairs");
var Cards = new Meteor.Collection("cards");


Pairs.find({}).observeChanges({
  removed: function(id) {
    console.log("In client, Thing removed " + id );
    var id = "a" + id;
    var selector_id = "#" + id;

    var removing_circle = d3.select("#board").selectAll(selector_id);
    removing_circle.remove();

    existing_circles = d3.select("#board").selectAll("g");
    console.log("new # of things = " + existing_circles.size());

    x_increment = (500 - 50) / (existing_circles.size() + 1);
    x_next = x_increment + 50;

    Template.board._draw_existing(existing_circles, x_next, x_increment);
  }
});


pair = function(list){
  var shuffled = _.shuffle(list);
  var midpoint = Math.floor(shuffled.length / 2);
  var first_half = shuffled.slice(0,midpoint);
  var second_half = shuffled.slice(midpoint, shuffled.length);

  return {
    first_half: first_half,
    second_half: second_half
  };
};

if (Meteor.isClient) {
  Template.body.helpers({
    people: function () {
      return People.find({});
    },
    pairs: function () {
      return Pairs.find({});
    }
  });


  Template.board.helpers({
    cards: function () {
      return Pairs.find({});
    },
    card: function() {
      var id = "a" + this._id;
      var selector_id = "#" + id;

      existing_circles = d3.select("#board").selectAll("g");
      console.log("current # of things = " + existing_circles.size());

      x_increment = (500 - 50) / (existing_circles.size() + 2);
      x_next = x_increment + 50;

      Template.board._draw_existing(existing_circles, x_next, x_increment);

      x_next = x_next + (x_increment * existing_circles.size());

      circle = d3.select("#board").selectAll(selector_id)
      circle_data = circle.data([id]);
      g_container = circle_data.enter()
        .append("g")
        .classed("thing", true)
        .attr("id", function(d) { return d })
        .attr("transform", function(d){
          i = x_next;
          x_next = x_next + x_increment;
          console.log("new circle at x = " + i);
          return "translate("+i+",100)"
        });

        g_container.append("rect")
          .style("stroke", "gray")
          .attr("x", 100)
          .attr("y", 50)
          .attr("height", 30)
          .attr("width", 70)
          .attr("rx", 10)
          .attr("ry", 10)
          .on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
          .on("mouseout", function(){d3.select(this).style("fill", "white");});



        g_container.append("text")
          .attr("dx", function(d) { return -20 })
          .text(this.name);
    }
  });


Template.board._draw_existing = function(existing_circles, x_next, x_increment) {
  existing_circles
    .transition()
    .duration(750)
    .style("stroke", "gray")
    .attr("transform", function(d){
      i = x_next;
      x_next = x_next + x_increment;
      console.log("move existing circle to x = " + i);
      return "translate("+i+",100)"
    });
}

d3.selection.prototype.size = function() {
  var n = 0;
  this.each(function() { ++n; });
  return n;
};







  Template.body.events({
    "submit .new-person": function (event) {
      var commaSeparator = /\s*,\s*/;

      var name = event.target.name.value;
      var learning = event.target.learning.value.split(commaSeparator);
      var teaching = event.target.teaching.value.split(commaSeparator);

      People.insert({
        name: name,
        learning: learning,
        teaching: teaching
      });

      event.target.name.value = "";
      $(event.target.learning).clearOptions();
      $(event.target.teaching).clearOptions();

      return false;
    }
  });

  $(document).ready(function () {
    $('.input-list').selectize({
      create: function (input) {
        return {
          value: input,
          text: input
        };
      },
      plugins: [
        'remove_button'
      ]
    });
  });

  Template.body.events({
    "submit .pair-it": function (event) {

      Meteor.call('clearPairs');

      pairings = pair(People.find().fetch());

      pairings.second_half.forEach(function(e,i) {
        Pairs.insert({
          pair: [
            pairings.first_half[i],
            pairings.second_half[i]
            ]
        });
      });

      return false;
    }
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    clearPairs: function () {
      Pairs.remove({});
    }
  });
}

