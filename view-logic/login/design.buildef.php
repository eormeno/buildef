<b-guest>
   <b-login title="Login page">
      <b-form title="Login" submit="Login" action="login">
         <b-input name="email" type="email" placeholder="Your email" label="Email" required="true" />
         <b-input name="password" type="password" placeholder="Password" label="Password" required="true" />
         <b-checkbox name="remember" label="Remember me" />
         <b-button-secondary text="I forget the password" action="forguetPassword" />
      </b-form>
   </b-login>
</b-guest>