module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            "id" : {
                type:Number,
                default:null
            },
            "name" : {
                type: String,
                required: true,
            },
            "email" : {
                type: String,
                required: true,
                unique: true
            },
            "password": {
                type:String,
                required:true,
            },
            "role" : {
                type: String,
                default: 'agent'
            },
            "organization_phone" : {
                type: String,
                required: true
            },
            "dark_mode" : {
                type: Boolean,
                default: 0
            },
            "timezone" : {
                type: String,
                default: null
            },
            "display_picture" : {
                type: String,
                default: 'https://cherami-media.s3.ap-southeast-1.amazonaws.com/images/profile-placeholder.jpg'
            },
            "device_token" : {
                type: String,
                default: null,
            },
            "user_token" : {
                type: String,
                default: null
            },
            "last_log_in" : {
                type: Date,
                default:null
            },
            "last_log_out" : {
                type: Date,
                default:null
            },
        }, {
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

  const Users = mongoose.model("users", schema);
  return Users;
};
