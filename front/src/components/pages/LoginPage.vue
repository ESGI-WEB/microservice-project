<script setup>
import {ref} from 'vue';

const email = ref(null);
const password = ref(null);

function login() {

  // if ([email, password].includes(null)) {
  //   return fail(400, {error: 'You must specify all the fields'});
  // }
  //
  // try {
  //   const {response} = await authClient.login({
  //     email: email as string,
  //     password: password as string,
  //     ip: '10.10.10.10'
  //   });
  //
  //   switch (response.status) {
  //     case LoginResponse_STATUS.OK: {
  //       cookies.set('jwt', response.jwt, {
  //         path: '/',
  //         httpOnly: true
  //       });
  //       cookies.set('refreshToken', response.refreshToken, {
  //         path: '/',
  //         httpOnly: true
  //       });
  //       const buffer = Buffer.from(
  //           JSON.stringify(response.user, (_, v) => (typeof v === 'bigint' ? v.toString() : v)),
  //           'utf-8'
  //       );
  //       const base64 = buffer.toString('base64');
  //       cookies.set('user', base64, {
  //         path: '/',
  //         httpOnly: true
  //       });
  //       return {success: true};
  //     }
  //     case LoginResponse_STATUS.NOT_FOUND:
  //       return fail(400, {error: email + ' not found'});
  //     case LoginResponse_STATUS.WRONG_PASSWORD:
  //       return fail(400, {error: 'wrong password'});
  //     case LoginResponse_STATUS.INTERNAL:
  //       return fail(400, {error: 'something went wrong'});
  //     default:
  //       break;
  //   }
  // } catch (error: any) {
  //   return fail(400, {error: error?.message || 'something went wrong'});
  // }
}
</script>

<template>
  <div class="login">
    <h1>Login</h1>
    <form>
      <label for="username">Username</label>
      <input type="text" id="username"/>
      <label for="password">Password</label>
      <input type="password" id="password"/>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
