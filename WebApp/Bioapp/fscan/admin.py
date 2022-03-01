from django.contrib import admin


from .models import Register

class RegisterModelAdmin(admin.ModelAdmin):
    list_display = ["pk", "first_name", "last_name", "created_at", "entry_officer" ]
    list_display_links = ["first_name"]
    # list_editable = ["first_name"]
    list_filter = ["created_at", "updated_at"]
    search_fields = ["first_name", "pk"]
    class Meta:
        model = Register


admin.site.register(Register, RegisterModelAdmin)