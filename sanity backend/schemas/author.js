export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'user_id',
      title: 'User ID',
      type: 'string',
    },
    {
      name: 'id',
      title: 'id',
      type: 'number',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'task',
      title: 'Task',
      type: 'string',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'is_completed',
      title: 'is_completed',
      type: 'boolean',
    },
    {
      name: 'inserted_at',
      title: 'inserted_at',
      type: 'datetime',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
}
