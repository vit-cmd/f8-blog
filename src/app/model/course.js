export function CourseModel(sequelize, Sequelize) {
  return sequelize.define("Courses", {
    name: { 
      type: Sequelize.STRING, 
      allowNull: false, 
    },
    
    description: { 
      type: Sequelize.STRING 
    },
    image: { 
      type: Sequelize.STRING 
    },
    videoId: { 
      type: Sequelize.STRING, 
      allowNull: false, 
    },
    level: { 
      type: Sequelize.STRING 
    },
    slug: { 
      type: Sequelize.STRING, 
      unique: true 
    },
    deletedAt: {
      type: Sequelize.BOOLEAN,
      default: false
    }
  })
}