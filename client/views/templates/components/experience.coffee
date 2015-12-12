Template.experience.helpers
  experienceToText: ->
    if this.experience == "1"
      return "Beginner"
    else if this.experience == "2"
      return "Intermediate"
    else if this.experience == "3"
      return "Advanced"
