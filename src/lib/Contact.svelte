<script lang="ts">
  import Button from '$lib/Button.svelte'
  import InputField from './InputField.svelte'

  export let data: any
  export let whatsapp: string

  const defaultBody = {email: '', message: '', name: ''}
  let body = defaultBody
  let botCheck = ''
  let submitted = false

  const handleSubmit = () => {
    if (botCheck) {
      return
    }

    fetch('https://api.timoanttila.com/tuspe.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(() => {
        submitted = true
        body = defaultBody
      })
      .catch(err => {
        console.error(err)
      })
  }
</script>

<section>
  <div class="h-fit max-w-full relative z-20">
    <svg class="block h-fit max-w-full" viewBox="0 0 2400 300" width="100%" height="300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
      <rect x="0" y="0" width="2400" height="300" class="fill-transparent" />
      <path d="M0 92L50 91.8C100 91.7 200 91.3 300 112.7C400 134 500 177 600 175.5C700 174 800 128 900 118.5C1000 109 1100 136 1200 151.8C1300 167.7 1400 172.3 1500 158C1600 143.7 1700 110.3 1800 97.7C1900 85 2000 93 2100 114.8C2200 136.7 2300 172.3 2350 190.2L2400 208L2400 301L2350 301C2300 301 2200 301 2100 301C2000 301 1900 301 1800 301C1700 301 1600 301 1500 301C1400 301 1300 301 1200 301C1100 301 1000 301 900 301C800 301 700 301 600 301C500 301 400 301 300 301C200 301 100 301 50 301L0 301Z" class="fill-surface-wave" />
    </svg>
  </div>

  <div class="bg-surface-wave pb-10">
    <div class="max-w-screen-md mx-auto px-6 text-black">
      <h2 class="mb-10 mt-0 text-center wave">{data.title}</h2>
      <div class="gap-6 grid md:grid-cols-3">
        <div>
          {@html data.content}

          <div class="mt-8">
            <Button icon="round-whatsapp" link={whatsapp} title="WhatsApp" />
          </div>
        </div>

        <form on:submit|preventDefault={() => handleSubmit()} class="gap-4 grid md:col-span-2">
          {#if submitted}
            <p class="text-center"><strong>Kiitos yhteydenotosta.</strong><br />Olemme teihin yhteydessä 24 tunnin sisällä.</p>
          {:else if data.form}
            <InputField bind:value={body.name} label={data.form.name} type="text" maxlength={100} minlength={2} name="name" />
            <InputField bind:value={body.email} label={data.form.email} type="email" maxlength={100} minlength={6} name="email" />

            <label>
              <span class="block leading-normal mb-1 ml-4">{data.form.message}<sup class="leading-none text-red-600">*</sup></span>
              <textarea bind:value={body.message} class="h-32" minlength="10" maxlength="500" required />
            </label>

            <input bind:value={botCheck} class="hidden" type="email" name="emailVariation" />

            <div class="text-right">
              <button class="nav-active border border-gray-300 border-solid inline-block no-underline px-8 py-3 rounded-full uppercase" type="submit">
                <strong>{data.form.submit}</strong>
              </button>
            </div>
          {/if}
        </form>
      </div>
    </div>
  </div>
</section>
