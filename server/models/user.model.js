import { Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'
import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'


const userSchema = new Schema({
  fullName:{
    type:'String',
    required:[true,'name is required'],
    minLength:[5,'name must be at least 5 charcter'],
    maxLength:[50,'name must be less then 5 charcter'],
    lowercase:true,
    trim:true
  },
  email:{
    type:'String',
    required:[true,'email is required'],
    lowercase:true,
    unique:true,
    match:[
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ]
  },
  password:{
    type:'String',
    required:[true,'Password is required'],
    minLength:[8,'password must be at least 8 character'],
    select:false
  },
  avatar:{
    public_id:{
        type:'String',
    },
    secure_url:{
        type:'String'
    }
  },
  role:{
    type:"String",
    enum:['USER','ADMIN'],
    default:'USER'
  },
  forgotPasswordToken:String,
  forgotPasswordExpiry:Date,
  subscription:{
    id:String,
    status:String
  }

},
{
    timestamps:true
});

userSchema.pre('save', async function (next) {
  // If password is not modified then do not hash it
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods={
  comparePassword: async function(plainTextPassword){
    return await bcrypt.compare(plainTextPassword,this.password)
  },
  generateJWTTOken: async function(){
    return  await jwt.sign(
      {id:this._id,email:this.email,subscription:this.subscription,role:this.role},
      process.env.JWT_SECRET ,
      {expiresIn:process.env.JWT_EXPIRY}
    )
  },
  generatePasswordResetToken: async function (next){
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.forgotPasswordToken=crypto.createHash('sha256')
                                  .update(resetToken)
                                  .digest('hex');
    this.forgotPasswordExpiry=Date.now()+15*60*1000;

    return resetToken;
  }
  
}

const User = model('User',userSchema);

export default User;