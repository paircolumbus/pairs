var People = new Meteor.Collection("people");
var Pairs = new Meteor.Collection("pairs");

/*
Pairs.find({}).observeChanges({
  removed: function(id) {
    console.log("In client, Thing removed " + id );
    var id = "a" + id;
    var selector_id = "#" + id;

    var removing_card = d3.select("#board").selectAll(selector_id);
    removing_card.remove();

    existing_cards = d3.select("#board").selectAll("g");
    console.log("new # of things = " + existing_cards.size());

    x_increment = (500 - 50) / (existing_cards.size() + 1);
    x_next = x_increment + 50;

    Template.board._draw_existing(existing_cards, x_next, x_increment);
  }
});
*/


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

negmod = function(n){
  if(n % 2 === 1){
    return 1
  }else{
    return -1
  }
}

if (Meteor.isClient) {
  Template.body.helpers({
    people: function () {
      return People.find({});
    },
    pairs: function () {
      return Pairs.find({});
    }
  });

  Template.board.cards = function () {
    pairss = Pairs.find({});
    return pairss;
  }

  var drag = d3.behavior.drag()
      .origin(function(d) { return d; })
      .on("dragstart", dragstarted)
      .on("drag", dragged)
      .on("dragend", dragended);

  function dragstarted(d) {
    d3.event.sourceEvent.stopPropagation();
    d3.select(this).classed("dragging", true);
    console.log("drag started...");
  }

  function dragged(d) {
    console.log(d);
    d3.select(this)
      .attr("x", d.x = d3.event.x)
      .attr("y", d.y = d3.event.y);

    console.log(d);
    console.log("d3.event: "+[d.x, d.y]);
    console.log("d3.event: "+[d3.event.dx, d3.event.dy]);
    console.log("d3.event: "+[d3.event.x, d3.event.y]);
    console.log("d3.event: "+[d.x, d.y]);
    console.log("dragged ...");
  }

  function dragended(d) {
    d3.select(this).classed("dragging", false);
    console.log("drag ended ...");
  }

  Template.board.card = function() {
      var id = "a" + this._id;
      var selector_id = "#" + id;

      existing_cards = d3.select("#board").selectAll("g");
      //console.log("current # of things = " + existing_cards.size());

      x_increment = 210;
      x_next = x_increment + 50;
      //console.log("x_next is now " + x_next);
      //console.log("x_increment is now " + x_increment);

      y_increment = 100;
      y_next = y_increment;

      Template.board._draw_existing(existing_cards, x_next, x_increment, y_next, y_increment);

      var dd = existing_cards.size();
      x_next = x_next + ( negmod(dd-1) * (x_increment) ) ;
      y_next = y_next + ( ( (dd-1) / 2) * (y_increment)) ;

      //console.log("x_next is now " + x_next);

      card = d3.select("#board").selectAll(selector_id)
      card_data = card.data([id]);
      g_container = card_data.enter()
        .append("g")
        .classed("thing", true)
        .attr("id", function(d) { return d })
        .attr("transform", function(d,dd){
          i = x_next;
          j = y_next;
          x_next = x_next + ( (negmod(dd)) * (x_increment)) ;
          y_next = y_next + ( (dd % 2) * (y_increment)) ;
          //console.log("new card at x,y = " + [i,j]);
          return "translate("+i+","+j+")"
        });

        g_container.append("rect")
          .style("stroke", "gray")
          .attr("x", 100)
          .attr("y", 25)
          .attr("height", 75)
          .attr("width", 200)
          .attr("rx", 10)
          .attr("ry", 10)
          .on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
          .on("mouseout", function(){d3.select(this).style("fill", "white");})
          .call(drag);

        g_container.append("text")
          .attr("dx", function(d) { return 110 })
          .attr("dy", function(d) { return 75 })
          .text(this.name);
    }


  Template.board._draw_existing = function(existing_cards, x_next, x_increment, y_next, y_increment) {
    existing_cards
      .transition()
      .duration(750)
      .style("stroke", "gray")
      .attr("transform", function(d, dd){
        //console.log([d,dd]);
        i = x_next;
        j = y_next;
        x_next = x_next + ( (negmod(dd)) * (x_increment)) ;
        y_next = y_next + ( (dd % 2) * (y_increment)) ;
        //console.log("move existing card to x,y = " + [i,j]);
        return "translate("+i+","+j+")"
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

    Meteor.call('clearPairs');
  });

  Template.body.events({
    "submit .pair-it": function (event) {

      Meteor.call('clearPairs');
      d3.selectAll('.thing').remove();


      pairings = pair(People.find().fetch());

      pairings.second_half.forEach(function(e,i) {
        Pairs.insert({
          pair: [
            pairings.first_half[i],
            pairings.second_half[i]
            ]
        });
        console.log("shuffle: "+ pairings.first_half[0].name);
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

