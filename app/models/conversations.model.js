module.exports = mongoose => {
    var ObjectId = mongoose.Schema.ObjectId,
        labelsSchema = mongoose.Schema({
            id : Number,
            name : String,
            colour : String,
            _id : ObjectId
        }),
        tagsSchema = mongoose.Schema({
            id : Number,
            name : String,
            colour : String,
            _id : ObjectId
        }),
        messagesSchema = mongoose.Schema({
            id : Number,
            local_id : String,
            sid : String,
            body : String,
            media_url : String,
            media_content_type : String,
            media_content_length : Number,
            is_s3 : Boolean,
            is_sent : Boolean,
            media_file_name : String,
            latitude : String,
            longitude : String,
            message_type : String,
            location_search_query : String,
            status : String,
            status_type : Number,
            status_updated_at : Date,
            is_reply : Boolean,
            is_deleted : Boolean,
            msg_id : ObjectId,
            ip : String,
            message_created : Date,
            message_timezone : String,
            message_sent : String,
            message_sent_timezone : String,
            template_message : Boolean,
            msg_template_id : Date,
            tags : [tagsSchema]
        }),
        schema = mongoose.Schema(
            {
                id : Number,
                user_id : ObjectId,
                contact_id : ObjectId,
                is_pinned: Boolean,
                is_read : Boolean,
                unread_count : Boolean,
                is_archieved : Boolean,
                admin_tookover : Boolean,
                original_user_id : ObjectId,
                is_deleted : Boolean,
                is_promoted : Boolean,
                labels : [labelsSchema],
                organization_phone: Number,
                messages: [messagesSchema]
            },
            {
                timestamps: {
                    createdAt: 'created_at',
                    updatedAt: 'updated_at'
                },
            }
        );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Conversations = mongoose.model("conversations", schema);
  return Conversations;
};
