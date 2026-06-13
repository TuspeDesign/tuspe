<script lang="ts">
  import {Input, preventDefault} from '@tuspe/components'
  import ButtonLink from '$lib/ButtonLink.svelte'
  import Wave from '$lib/Wave.svelte'
  import {PUBLIC_CF_KEY} from '$env/static/public'

  let {data, whatsapp}: {data: any; whatsapp: string} = $props()

  const defaultBody = {email: '', firstName: '', lastName: '', message: ''}
  let body = $state({...defaultBody})
  let submitted = $state(false)
  let error = $state(false)

  const handleSubmit = async (e: SubmitEvent) => {
    const form = e.target as HTMLFormElement
    const token = (form.querySelector('[name="cf-turnstile-response"]') as HTMLInputElement)?.value

    if (!token) {
      return
    }

    error = false

    try {
      const res = await fetch('/api/emails', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...body, token})
      })

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
      }

      submitted = true
      body = {...defaultBody}
    } catch (err) {
      error = true
      console.error(err)
    }
  }
</script>

<svelte:head>
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>

<section>
  <Wave />

  <div class="bg-surface-wave">
    <div class="max-w-screen-md mx-auto px-6 text-black">
      <h2 class="mb-10 mt-0 text-center wave">{data.title}</h2>
      <div class="gap-6 grid md:grid-cols-3">
        <div>
          {@html data.content}

          <div class="mt-8">
            <ButtonLink icon="round-whatsapp" link={whatsapp} title="WhatsApp" />
          </div>
        </div>

        <form onsubmit={preventDefault(handleSubmit)} class="gap-4 grid md:col-span-2">
          {#if submitted}
            <p class="text-center"><strong>Kiitos yhteydenotosta.</strong><br />Olemme teihin yhteydessä 24 tunnin sisällä.</p>
          {:else if data.form}
            <Input bind:value={body.name} bgColor="white" outerClass="text-white" label={data.form.name} type="text" max={60} min={2} required />
            <Input bind:value={body.email} bgColor="white" outerClass="text-white" label={data.form.email} type="email" max={60} min={6} required />
            <Input bind:value={body.message} bgColor="white" outerClass="text-white" label={data.form.message} type="textarea" max={1000} min={10} inputClass="h-32" required />
            {#if error}
              <p class="text-center text-red-600">{data.form.error}</p>
            {/if}

            <div class="text-right">
              <button class="border border-gray-300 border-solid inline-block nav-active px-10 py-3 rounded-full" type="submit"><strong>{data.form.submit}</strong></button>
            </div>

            <div class="cf-turnstile mt-4 text-center" data-sitekey={PUBLIC_CF_KEY}></div>
          {/if}
        </form>
      </div>
    </div>
  </div>

  <Wave flip />
</section>
