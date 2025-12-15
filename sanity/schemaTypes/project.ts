export default {
    name: 'project',
    title: 'Projects',
    type: 'document',
    fields: [
      { name: 'title', title: 'Project Title', type: 'string' },
      { name: 'description', title: 'Short Description', type: 'text' },
      { name: 'image', title: 'Project Image', type: 'image', options: { hotspot: true } },
      { 
        name: 'techStack', 
        title: 'Tech Stack', 
        type: 'array', 
        of: [{ type: 'string' }],
        options: { layout: 'tags' },
        description: 'Press Enter after typing a tech (e.g. "Arduino", "IoT")'
      },
      { name: 'githubLink', title: 'GitHub/Demo Link', type: 'url' },
      { 
        name: 'status', 
        title: 'Status', 
        type: 'string', 
        options: { list: ['Completed', 'In Progress', 'Prototype'] } 
      }
    ]
  }