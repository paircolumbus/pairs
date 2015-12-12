Template.experience.helpers
  experienceToText: ->
    if this.experience == "1"
      return "Beginner"
    else if this.experience == "2"
      return "Intermediate"
    else if this.experience == "3"
      return "Advanced"
    else
      return "Experience?"

Template.experience.events
  'change select': (event, v) ->
    experience = $(event.target).val()
    Meteor.call('updatePerson', this._id, {experience: experience})
    $(event.target).parent().toggle()
  'click .experience': (event, v) ->
    $(event.target).parent().parent().find('.edit-experience').toggle();
    
